# Claude Code Notification(permission_prompt) hook - Slack 권한요청 알림
param()

$ErrorActionPreference = "Continue"
$logFile = Join-Path $env:CLAUDE_PROJECT_DIR ".claude\hooks\hook.log"
function Write-Log($msg) {
    try { Add-Content -Path $logFile -Value "[$(Get-Date -Format 'HH:mm:ss')] [perm] $msg" -Encoding utf8 } catch {}
}

Write-Log "invoked, CLAUDE_PROJECT_DIR=$env:CLAUDE_PROJECT_DIR"

$envFile = Join-Path $env:CLAUDE_PROJECT_DIR ".env"
$webhookUrl = $env:SLACK_WEBHOOK_URL
if (-not $webhookUrl -and (Test-Path $envFile)) {
    $raw = [System.IO.File]::ReadAllText($envFile)
    if ($raw -match 'SLACK_WEBHOOK_URL\s*=\s*"?([^"\r\n]+?)"?\s*(\r?\n|$)') {
        $webhookUrl = $matches[1].Trim()
    }
}
if (-not $webhookUrl) { Write-Log "SLACK_WEBHOOK_URL empty, exit"; exit 0 }

$inputJson = $input | Out-String
try { $data = $inputJson | ConvertFrom-Json } catch { $data = $null }

$project = if ($data -and $data.cwd) { Split-Path $data.cwd -Leaf } else { "Unknown" }

$message = "🔐 *Claude Code 권한 요청*`n• 프로젝트: ``$project```n승인이 필요합니다. Claude Code로 돌아가주세요."

$body = @{ text = $message } | ConvertTo-Json -Compress
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
try {
    Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $bodyBytes -ContentType "application/json; charset=utf-8" | Out-Null
    Write-Log "POST ok"
} catch {
    Write-Log "POST failed: $($_.Exception.Message)"
}
