$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\backend")
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
if (-not (Test-Path ".venv\Scripts\python.exe")) { py -m venv .venv }
$python = Join-Path (Get-Location) ".venv\Scripts\python.exe"
& $python -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) { throw "Backend pip install failed" }
Write-Host "Backend: http://127.0.0.1:8000/health"
& $python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
if ($LASTEXITCODE -ne 0) { throw "Backend server failed" }
