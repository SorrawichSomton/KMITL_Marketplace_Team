$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "backend")

if (-not (Test-Path ".env")) { throw "Missing backend/.env - re-extract the ZIP" }

Write-Host "Checking backend dependencies..."
python -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) { throw "Backend pip install failed" }

Write-Host "Starting Backend: http://127.0.0.1:8000"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
if ($LASTEXITCODE -ne 0) { throw "Backend failed to start" }
