Write-Host "Starting Backtest Application..." -ForegroundColor Cyan
Write-Host ""

# Set paths relative to script location
$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

# Check if Windows Terminal is available
$wtInstalled = Get-Command wt -ErrorAction SilentlyContinue

if ($wtInstalled) {
    Write-Host "Opening Backend in new window with Frontend tab..." -ForegroundColor Yellow
    
    $pwsh = "powershell.exe" # Rely on path
    
    # Commands to run
    # We use -NoExit so the window stays open if it crashes immediately
    $backendCmd = "Set-Location '$backendPath'; .\venv\Scripts\Activate.ps1; python main.py"
    $frontendCmd = "Set-Location '$frontendPath'; pnpm dev"

    # Encode commands to avoid parsing issues with Windows Terminal and semicolons
    $backendBytes = [System.Text.Encoding]::Unicode.GetBytes($backendCmd)
    $backendEncoded = [Convert]::ToBase64String($backendBytes)

    $frontendBytes = [System.Text.Encoding]::Unicode.GetBytes($frontendCmd)
    $frontendEncoded = [Convert]::ToBase64String($frontendBytes)

    # Call wt with EncodedCommand
    # Note: We use `; to separate wt tabs. The arguments to powershell are now safe from splitting.
    wt --window 0 new-tab --title "Backend" -d "$backendPath" "$pwsh" -NoExit -EncodedCommand "$backendEncoded" `; new-tab --title "Frontend" -d "$frontendPath" "$pwsh" -NoExit -EncodedCommand "$frontendEncoded"
}
else {
    Write-Host "Windows Terminal not found, using separate PowerShell windows..." -ForegroundColor Yellow
    
    Write-Host "Opening Backend in new window..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backendPath'; .\venv\Scripts\Activate.ps1; python main.py"

    Start-Sleep -Seconds 1

    Write-Host "Opening Frontend in new window..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontendPath'; pnpm dev"
}

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Waiting for servers to initialize..." -ForegroundColor Yellow

# Wait for servers to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Opening Browser..." -ForegroundColor Yellow

# Launch default browser
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Application started!" -ForegroundColor Green
Write-Host "  Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""

