#!/usr/bin/env bash
set -euo pipefail

INPUT="${1:-}"
MCP_URL="${MCP_URL:-http://127.0.0.1:3845/mcp}"

if [[ -z "$INPUT" ]]; then
  echo "Usage:"
  echo "  ./scripts/figma_props.sh 26:118"
  echo "  ./scripts/figma_props.sh 26-118"
  echo "  ./scripts/figma_props.sh \"https://www.figma.com/design/...?...&node-id=26-118\""
  echo "  ./scripts/figma_props.sh \"https://www.figma.com/design/...?...&node-id=1%3A2\""
  exit 1
fi

# Decode minimal URL encodings we care about for node-id:
# - %3A -> :
# - %2D -> -
urldecode_nodeid() {
  local s="$1"
  s="${s//%3A/:}"
  s="${s//%3a/:}"
  s="${s//%2D/-}"
  s="${s//%2d/-}"
  echo "$s"
}

extract_node_id() {
  local s="$1"

  # If URL, extract node-id=... value
  if [[ "$s" == http* ]] && [[ "$s" == *"node-id="* ]]; then
    s="${s#*node-id=}"
    s="${s%%&*}"
    s="${s%%#*}"
  fi

  # Decode common encodings
  s="$(urldecode_nodeid "$s")"

  # Convert 26-118 to 26:118 (MCP format)
  s="${s//-/:}"

  # Validate: must look like digits:digits (allow negative just in case)
  if [[ ! "$s" =~ ^-?[0-9]+:-?[0-9]+$ ]]; then
    echo "Error: could not parse nodeId from input:"
    echo "  $1"
    echo "Expected formats:"
    echo "  - 26:118"
    echo "  - 26-118"
    echo "  - Figma URL containing node-id=26-118 or node-id=1%3A2"
    exit 1
  fi

  echo "$s"
}

NODE_ID="$(extract_node_id "$INPUT")"

# 1) initialize -> session id
SESSION_ID="$(
  curl -sS -D - -o /dev/null -X POST "$MCP_URL" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" \
    --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"bash","version":"1.0"}}}' \
  | tr -d '\r' | awk -F': ' 'tolower($1)=="mcp-session-id"{print $2; exit}'
)"

echo "=== MCP_URL: $MCP_URL ==="
echo "=== NODE_ID: $NODE_ID ==="
echo

# 2) variable defs (tokens used in node)
echo "=== get_variable_defs ==="
curl -sS -X POST "$MCP_URL" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "mcp-session-id: $SESSION_ID" \
  --data "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"tools/call\",\"params\":{\"name\":\"get_variable_defs\",\"arguments\":{\"nodeId\":\"$NODE_ID\"}}}"

echo
echo
# 3) metadata (structure overview)
echo "=== get_metadata ==="
curl -sS -X POST "$MCP_URL" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "mcp-session-id: $SESSION_ID" \
  --data "{\"jsonrpc\":\"2.0\",\"id\":3,\"method\":\"tools/call\",\"params\":{\"name\":\"get_metadata\",\"arguments\":{\"nodeId\":\"$NODE_ID\"}}}"

echo
echo
# 4) design context (properties/styles interpreted)
echo "=== get_design_context ==="
curl -sS -X POST "$MCP_URL" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "mcp-session-id: $SESSION_ID" \
  --data "{\"jsonrpc\":\"2.0\",\"id\":4,\"method\":\"tools/call\",\"params\":{\"name\":\"get_design_context\",\"arguments\":{\"nodeId\":\"$NODE_ID\",\"clientLanguages\":\"typescript,react\",\"clientFrameworks\":\"react\"}}}"
echo
