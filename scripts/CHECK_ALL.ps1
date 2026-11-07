$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\frontend")
npm run lint
if ($LASTEXITCODE -ne 0) { throw "Lint failed" }
npm run typecheck
if ($LASTEXITCODE -ne 0) { throw "Typecheck failed" }
npm run build
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed" }
Set-Location "..\backend"
if (Test-Path ".venv\Scripts\python.exe") { & .\.venv\Scripts\python.exe -m pytest -q }
else { python -m pytest -q }
if ($LASTEXITCODE -ne 0) { throw "Backend tests failed" }
Write-Host "All local checks completed successfully"
