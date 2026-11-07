"""Check boundaries on feature PRs. Owner can integrate shared files."""
import os
import subprocess
import sys

RULES = {
    "feature/accounts-": (
        "frontend/app/login/", "frontend/app/profile/", "frontend/features/accounts/",
        "backend/app/features/accounts/", "backend/tests/accounts/",
    ),
    "feature/catalog-": (
        "frontend/app/listings/", "frontend/features/catalog/",
        "backend/app/features/catalog/", "backend/tests/catalog/",
    ),
    "feature/trading-": (
        "frontend/app/sell/", "frontend/app/reservations/", "frontend/features/trading/",
        "backend/app/features/trading/", "backend/tests/trading/",
    ),
    "feature/community-": (
        "frontend/app/messages/", "frontend/app/reviews/", "frontend/app/notifications/",
        "frontend/features/community/", "backend/app/features/community/", "backend/tests/community/",
    ),
}


def changed_paths(base: str, head: str) -> list[str]:
    output = subprocess.check_output(
        ["git", "diff", "--name-only", f"{base}...{head}"], text=True
    )
    return [line.strip() for line in output.splitlines() if line.strip()]


def main() -> int:
    branch = os.environ.get("HEAD_BRANCH", "")
    base, head = os.environ.get("BASE_SHA"), os.environ.get("HEAD_SHA")
    if not (base and head):
        print("Missing BASE_SHA / HEAD_SHA", file=sys.stderr)
        return 2
    if branch.startswith("feature/owner-"):
        print("Owner integration PR: shared paths permitted")
        return 0
    allowed = next((paths for prefix, paths in RULES.items() if branch.startswith(prefix)), None)
    if allowed is None:
        print(f"Unexpected PR branch {branch!r}. Use one of the documented prefixes.", file=sys.stderr)
        return 1
    changed = changed_paths(base, head)
    bad = [p for p in changed if not p.startswith(allowed)]
    if bad:
        print("These paths are owned by somebody else / owner:", *bad, sep="\n - ", file=sys.stderr)
        return 1
    print(f"Ownership check passed: {len(changed)} changed paths")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
