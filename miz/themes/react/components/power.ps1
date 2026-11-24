Get-ChildItem -Directory | ForEach-Object {
    $folderName = $_.Name
    $pageFile = Join-Path $_.FullName "page.jsx"
    $newFile = Join-Path $_.FullName "$folderName.jsx"

    if (Test-Path $pageFile) {
        Rename-Item -Path $pageFile -NewName "$folderName.jsx"
        Write-Host "Renamed: $folderName/page.jsx -> $folderName/$folderName.jsx" -ForegroundColor Green
    }
}