$ErrorActionPreference = 'Stop'
Write-Host "Starting Backend Server..." -ForegroundColor Cyan

$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

$activateScript = Join-Path "venv" "Scripts" "Activate.ps1"
if (Test-Path $activateScript) {
    & $activateScript
} else {
    Write-Error "Virtual environment activation script not found at $activateScript"
}

python main.py

