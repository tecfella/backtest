$ErrorActionPreference = 'Stop'
Write-Host "Starting Frontend Development Server..." -ForegroundColor Cyan

$frontendPath = Join-Path $PSScriptRoot "frontend"
Set-Location $frontendPath

pnpm dev

