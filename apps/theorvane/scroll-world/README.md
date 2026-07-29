# Theorvane Scroll World production workspace

This directory contains reviewable prompts and verification tooling only. It **never** contains OAuth values, account identifiers, signed URLs, credentials, raw media, or generated assets.

## No-spend contract

- Work only in `/tmp/theorvane-scroll-world-production/` while producing candidate media.
- Stop after exactly **one still and one dive clip** calibration until the user explicitly approves the reported cost and full pilot ceiling.
- Use `ffprobe` to record real duration, codec, and dimensions; use SHA-256 for every runtime artifact.
- Use `scripts/extract-boundary-frame.sh` to create connector inputs from rendered `dive-i-last.png` and `dive-i-plus-1-first.png`. Never condition a connector on an original still.
- `scripts/validate-media-manifest.mjs` accepts only public root-relative paths under `public/scroll-world/`; it rejects URLs, query strings, tokens, filesystem paths, invalid inventory, and incomplete provenance.
- `scripts/verify-seams.mjs` validates checked-in runtime media. It reports defects and **never** rerolls or downloads anything.

## Validation

```bash
node --test apps/theorvane/scroll-world/test/media-manifest-contract.test.mjs
node apps/theorvane/scroll-world/scripts/validate-media-manifest.mjs --help
bash -n apps/theorvane/scroll-world/scripts/extract-boundary-frame.sh
```

## Approved inventory after an explicit full-budget approval

For each native variant: five scene stills, five dives, four frame-conditioned connectors, one encoded timeline, and one poster. The desktop and mobile productions are separate compositions; mobile is never a desktop crop.
