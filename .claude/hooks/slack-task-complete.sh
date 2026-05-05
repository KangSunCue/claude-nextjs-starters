#!/usr/bin/env bash
# Claude Code Stop hook - 작업 완료 시 Slack 알림

PROJECT_DIR=$(cygpath -u "$CLAUDE_PROJECT_DIR" 2>/dev/null || echo "$CLAUDE_PROJECT_DIR")
[ -f "$PROJECT_DIR/.env" ] && source "$PROJECT_DIR/.env"
WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"
[ -z "$WEBHOOK_URL" ] && exit 0

INPUT=$(cat)

HOOK_INPUT="$INPUT" PYTHONUTF8=1 python3 - <<'PYEOF'
import json, subprocess, os, sys, datetime

try:
    data = json.loads(os.environ.get('HOOK_INPUT', '{}'))
except Exception:
    data = {}

if data.get('stop_hook_active'):
    sys.exit(0)

cwd = data.get('cwd', '')
project = os.path.basename(cwd) if cwd else 'Unknown'
now = datetime.datetime.now().strftime('%H:%M:%S')

webhook_url = os.environ.get('SLACK_WEBHOOK_URL', '')
if not webhook_url:
    sys.exit(0)

message = (
    "✅ *Claude Code 작업 완료*\n"
    f"• 프로젝트: `{project}`\n"
    f"• 완료 시각: {now}\n"
    "Claude Code가 응답을 완료했습니다."
)

payload = json.dumps({'text': message})
subprocess.run(
    ['curl', '-s', '--max-time', '5', '-X', 'POST', webhook_url,
     '-H', 'Content-Type: application/json', '-d', payload],
    capture_output=True
)
PYEOF
