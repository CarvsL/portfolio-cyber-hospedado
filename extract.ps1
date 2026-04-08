c:\Users\lucas\AppData\Roaming\Code\User\workspaceStorage\da4ff7221bff4eb874392107701601b6\GitHub.copilot-chat\chat-session-resources\085637c0-05ed-4a0e-9065-626772bf2d4f = "c:\Users\lucas\AppData\Roaming\Code\User\workspaceStorage\da4ff7221bff4eb874392107701601b6\GitHub.copilot-chat\chat-session-resources\085637c0-05ed-4a0e-9065-626772bf2d4f"
$files = Get-ChildItem -Path $searchDir -Recurse -File -Filter "content.txt"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "Ataque Privilege Escalation e Novas Contas.png") {
        Write-Host "Found in: $($file.FullName)"
        $match = [regex]::Match($content, '(?s)const projects = \[(.*?)\];\s*let currentModalProjectId')
        if ($match.Success) {
            $match.Groups[1].Value | Out-File "old_data_array.txt" 
            Write-Host "Extracted!" 
        }
    }
}
