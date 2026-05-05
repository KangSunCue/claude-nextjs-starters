#!/usr/bin/env bash
# Claude Code Notification(permission_prompt) hook - Slack 권한요청 알림

PROJECT_DIR=$(cygpath -u "$CLAUDE_PROJECT_DIR" 2>/dev/null || echo "$CLAUDE_PROJECT_DIR")
[ -f "$PROJECT_DIR/.env" ] && source "$PROJECT_DIR/.env"
WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"
[ -z "$WEBHOOK_URL" ] && exit 0

INPUT=$(cat)

HOOK_INPUT="$INPUT" PYTHONUTF8=1 python3 - <<'PYEOF'
import json, subprocess, os, sys

try:
    data = json.loads(os.environ.get('HOOK_INPUT', '{}'))
except Exception:
    sys.exit(0)

cwd = data.get('cwd', '')
project = os.path.basename(cwd) if cwd else 'Unknown'

webhook_url = os.environ.get('SLACK_WEBHOOK_URL', '')
if not webhook_url:
    sys.exit(0)

message = (
    "\U0001f510 *Claude Code 권한 요청*\n"
    f"• 프로젝트: `{project}`\n"
    "승인이 필요합니다. Claude Code로 돌아가주세요."
)

payload = json.dumps({'text': message})
subprocess.run(
    ['curl', '-s', '--max-time', '5', '-X', 'POST', webhook_url,
     '-H', 'Content-Type: application/json', '-d', payload],
    capture_output=True
)
PYEOF
