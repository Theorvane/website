# Theorvane Scroll-cinematic Media Production Gate

This checklist governs the five-scene production batch. It authorizes **no media generation, provider connection, credit purchase, or deployment** by itself.

## Required inventory

Each variant is independently composed:

- Desktop 16:9: `scene-01` through `scene-05` dive clips; `connector-01-02` through `connector-04-05`.
- Mobile 9:16: native `scene-01` through `scene-05` dive clips; native `connector-01-02` through `connector-04-05`.

The total pilot is 10 scene stills and 18 video clips before explicitly approved rerolls. The current `studio-beacon` asset is a Scene 01 calibration enhancement only, not a complete timeline.

## Stop-before-spend sequence

1. Inspect the active provider workspace, balance, selected models, and the video model’s ability to accept both start and end frames.
2. Produce exactly one still and one low-cost video probe.
3. Report to the user: actual output, elapsed time, charge, full inventory, reroll allowance, estimate, and stop conditions.
4. Wait for explicit in-chat approval of that spend.
5. Generate and review all native scene stills before rendering scene clips.
6. Render dive clips. Extract the real final frame from each clip and the real initial frame from its successor.
7. Create every connector with those exact extracted frames. Do not replace a clip boundary with regenerated art.
8. Review each seam forward and backward. A seam defect, model mismatch, failed charge check, or low balance halts the batch.

## Commit-safe provenance

Keep raw prompts, raw media, signed URLs, OAuth data, secret payloads, reroll experiments, and extracted boundary frames outside the repository. Commit only selected optimized public assets and non-secret provenance: relative path, dimensions, duration, checksum, model/version, prompt hash, job ID, encoder settings, and human seam verdict.
