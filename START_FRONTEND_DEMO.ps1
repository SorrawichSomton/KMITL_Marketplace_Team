$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "frontend")

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Frontend packages..."
    npm install
    if ($LASTEXITCODE -ne 0) { throw "Frontend npm install failed" }
}

Write-Host "Starting Frontend: http://localhost:3000"
# The package dev script already specifies the Next.js CLI.
# Do not pass positional hostname arguments: Next treats them as paths.
npm run dev
if ($LASTEXITCODE -ne 0) { throw "Frontend failed to start" }
