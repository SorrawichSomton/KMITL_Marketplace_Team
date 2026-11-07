$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\frontend")
if (-not (Test-Path ".env.local")) { Copy-Item ".env.example" ".env.local" }
if (-not (Test-Path "node_modules")) {
    npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw "Frontend npm install failed" }
}
Write-Host "Frontend: http://localhost:3000"
npm run dev
if ($LASTEXITCODE -ne 0) { throw "Frontend server failed" }
