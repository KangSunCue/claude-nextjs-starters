# Claude Code Stop hook - 작업 완료 시 Slack 알림
param()

$ErrorActionPreference = "Continue"
$logFile = Join-Path $env:CLAUDE_PROJECT_DIR ".claude\hooks\hook.log"
function Write-Log($msg) {
    try { Add-Content -Path $logFile -Value "[$(Get-Date -Format 'HH:mm:ss')] [stop] $msg" -Encoding utf8 } catch {}
}

Write-Log "invoked, CLAUDE_PROJECT_DIR=$env:CLAUDE_PROJECT_DIR"

$envFile = Join-Path $env:CLAUDE_PROJECT_DIR ".env"
$webhookUrl = $env:SLACK_WEBHOOK_URL
if (-not $webhookUrl -and (Test-Path $envFile)) {
    $raw = [System.IO.File]::ReadAllText($envFile)
    if ($raw -match 'SLACK_WEBHOOK_URL\s*=\s*"?([^"\r\n]+?)"?\s*(\r?\n|$)') {
        $webhookUrl = $matches[1].Trim()
        Write-Log ".env webhook extracted, len=$($webhookUrl.Length)"
    } else {
        Write-Log "regex did not match SLACK_WEBHOOK_URL"
    }
}
if (-not $webhookUrl) { Write-Log "SLACK_WEBHOOK_URL empty, exit"; exit 0 }

$inputJson = $input | Out-String
Write-Log "stdin bytes=$($inputJson.Length)"
try { $data = $inputJson | ConvertFrom-Json } catch { $data = $null; Write-Log "json parse failed" }

if ($data -and $data.stop_hook_active) { Write-Log "stop_hook_active=true, exit"; exit 0 }

$project = if ($data -and $data.cwd) { Split-Path $data.cwd -Leaf } else { "Unknown" }
$now = Get-Date -Format "HH:mm:ss"

$message = "✅ *Claude Code 작업 완료*`n• 프로젝트: ``$project```n• 완료 시각: $now`nClaude Code가 응답을 완료했습니다."

$body = @{ text = $message } | ConvertTo-Json -Compress
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
try {
    Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $bodyBytes -ContentType "application/json; charset=utf-8" | Out-Null
    Write-Log "POST ok"
} catch {
    Write-Log "POST failed: $($_.Exception.Message)"
}
