
"""Check file ownership boundaries for team pull requests."""

import os
import subprocess
import sys


RULES = {
    "feature/accounts-": (
        "frontend/app/login/",
        "frontend/app/profile/",
        "frontend/features/accounts/",
        "backend/app/features/accounts/",
        "backend/tests/accounts/",
    ),
    "feature/catalog-": (
        "frontend/app/listings/",
        "frontend/components/ListingCard.tsx",
        "frontend/features/catalog/",
        "backend/app/features/catalog/",
        "backend/tests/catalog/",
    ),
    "feature/trading-": (
        "frontend/app/sell/",
        "frontend/app/reservations/",
        "frontend/features/trading/",
        "backend/app/features/trading/",
        "backend/tests/trading/",
    ),
    "feature/community-": (
        "frontend/app/messages/",
        "frontend/app/reviews/",
        "frontend/app/notifications/",
        "frontend/app/admin/",
        "frontend/features/community/",
        "backend/app/features/community/",
        "backend/tests/community/",
    ),
}

# One-time baseline integration PR.
BASELINE_BRANCH = "chore/integrate-tested-baseline"
BASELINE_PR_NUMBER = "6"
BASELINE_REPOSITORY = "SorrawichSomton/KMITL_Marketplace_Team"
BASELINE_TARGET = "main"


def changed_paths(base: str, head: str) -> list[str]:
    output = subprocess.check_output(
        ["git", "diff", "--name-only", f"{base}...{head}"],
        text=True,
    )
    return [
        line.strip()
        for line in output.splitlines()
        if line.strip()
    ]


def is_baseline_integration(branch: str) -> bool:
    return (
        branch == BASELINE_BRANCH
        and os.environ.get("PR_NUMBER") == BASELINE_PR_NUMBER
        and os.environ.get("GITHUB_REPOSITORY") == BASELINE_REPOSITORY
        and os.environ.get("BASE_BRANCH") == BASELINE_TARGET
    )


def main() -> int:
    branch = os.environ.get("HEAD_BRANCH", "")
    base = os.environ.get("BASE_SHA")
    head = os.environ.get("HEAD_SHA")

    if not (base and head):
        print(
            "Missing BASE_SHA / HEAD_SHA",
            file=sys.stderr,
        )
        return 2

    changed = changed_paths(base, head)

    # Temporary exception for the initial baseline PR only.
    if is_baseline_integration(branch):
        forbidden_parts = (
            "/node_modules/",
            "/.venv/",
            "/.next/",
            "/__pycache__/",
            "/uploads/",
        )

        forbidden = [
            path for path in changed
            if (
                path in ("backend/.env", "frontend/.env.local")
                or path.endswith(
                    (".db", ".sqlite", ".sqlite3", ".pyc")
                )
                or any(
                    part in f"/{path}"
                    for part in forbidden_parts
                )
            )
        ]

        if forbidden:
            print(
                "Forbidden files in baseline PR:",
                *forbidden,
                sep="\n - ",
                file=sys.stderr,
            )
            return 1

        print(
            f"Baseline PR #{BASELINE_PR_NUMBER}: "
            f"{len(changed)} changed paths checked."
        )
        return 0

    if branch.startswith("feature/owner-"):
        print("Owner integration PR: shared paths permitted")
        return 0

    allowed = next(
        (
            paths
            for prefix, paths in RULES.items()
            if branch.startswith(prefix)
        ),
        None,
    )

    if allowed is None:
        print(
            f"Unexpected PR branch {branch!r}. "
            "Use one of the documented prefixes.",
            file=sys.stderr,
        )
        return 1

    bad = [
        path
        for path in changed
        if not path.startswith(allowed)
    ]

    if bad:
        print(
            "These paths are owned by somebody else / owner:",
            *bad,
            sep="\n - ",
            file=sys.stderr,
        )
        return 1

    print(
        f"Ownership check passed: {len(changed)} changed paths"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
