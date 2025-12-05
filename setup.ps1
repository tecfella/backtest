$ErrorActionPreference = 'Stop'

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backtest Project Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

Write-Host "[1/4] Setting up Python virtual environment..." -ForegroundColor Yellow
Set-Location $backendPath

if (Test-Path "venv") {
    Write-Host "Virtual environment already exists, skipping creation..." -ForegroundColor Green
} else {
    python -m venv venv
    Write-Host "Virtual environment created successfully!" -ForegroundColor Green
}
Write-Host ""

Write-Host "[2/4] Activating virtual environment and installing Python dependencies..." -ForegroundColor Yellow
# Activate script path
$activateScript = Join-Path "venv" "Scripts" "Activate.ps1"

if (Test-Path $activateScript) {
    & $activateScript
} else {
    Write-Error "Virtual environment activation script not found at $activateScript"
}

python -m pip install --upgrade pip
pip install -r requirements.txt
Write-Host "Python dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "[3/4] Setting up frontend dependencies..." -ForegroundColor Yellow
Set-Location $frontendPath
pnpm install
Write-Host "Frontend dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Return to root
Set-Location $PSScriptRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the backend:" -ForegroundColor White
Write-Host "  1. cd backend" -ForegroundColor Gray
Write-Host "  2. .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host "  3. python main.py" -ForegroundColor Gray
Write-Host ""
Write-Host "To start the frontend:" -ForegroundColor White
Write-Host "  1. cd frontend" -ForegroundColor Gray
Write-Host "  2. pnpm dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Or use the provided start scripts:" -ForegroundColor White
Write-Host "  - .\start-backend.ps1" -ForegroundColor Gray
Write-Host "  - .\start-frontend.ps1" -ForegroundColor Gray
Write-Host "  - .\start-all.ps1" -ForegroundColor Gray
Write-Host ""

