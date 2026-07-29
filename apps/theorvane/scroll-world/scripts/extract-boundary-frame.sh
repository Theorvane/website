#!/usr/bin/env bash
set -euo pipefail
mode=""
input=""
output=""
while (($#)); do
  case "$1" in
    --first|--last) mode="${1#--}"; input="${2:-}"; shift 2 ;;
    --output) output="${2:-}"; shift 2 ;;
    *) echo "Usage: $0 (--first|--last) <clip.mp4> --output <frame.png>" >&2; exit 64 ;;
  esac
done
[[ -n "$mode" && -n "$input" && -n "$output" ]] || { echo "A mode, input, and output are required" >&2; exit 64; }
workspace="/tmp/theorvane-scroll-world-production/"
[[ "$input" == "$workspace"* && "$output" == "$workspace"* ]] || { echo "Input and output must remain under $workspace" >&2; exit 64; }
[[ -f "$input" ]] || { echo "Input clip does not exist: $input" >&2; exit 66; }
mkdir -p "$(dirname "$output")"
if [[ "$mode" == "first" ]]; then
  ffmpeg -hide_banner -loglevel error -y -i "$input" -frames:v 1 "$output"
else
  ffmpeg -hide_banner -loglevel error -y -sseof -0.04 -i "$input" -frames:v 1 "$output"
fi
