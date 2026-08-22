---
layout: default
title: Known Limitations
---

# Known Limitations

## Third-Party Service Dependency

The script calls [Mikann API](https://github.com/NoHeartPen/fast-mikann-api) (`https://fast-mikann-api.vercel.app/ruby/`), a Sudachi analyzer hosted on Vercel.

- **No API key** — this is what makes the script shareable as-is.
- **No guarantee of permanence**: personal project, no SLA, no documented quota. If it disappears, change `FURIGANA_ENDPOINT` (alternative: [Yomi API](https://github.com/ookii-tsuki/yomi), no key but finer segmentation — see below; or Yahoo! JAPAN's ルビ振り API, which requires a Client ID).
- **Privacy**: selected text goes to a third-party server. Avoid on sensitive content.
- **Text travels in the URL** (`/ruby/<phrase>`), not in the request body. Consequences: a `/` in the text would cause a 404 — the script splits on `/` and makes multiple calls — and very long selections may exceed URL length limits. No size limit is documented: for long passages, process paragraph by paragraph.

## Analysis Quality

Sudachi (mode C, long units) handles compounds well — `日本語(にほんご)` not `日本(にっぽん)語(ご)` — but remains statistical:

- **Homographs**: often correct (`会議を行(おこな)った` / `駅に行(い)った`), sometimes wrong — `辛いカレー` produces `辛(つら)い` instead of `辛(から)い`.
- **Imperfect segmentation**: `一日中` → `一(いち)日(にち)中(ちゅう)` instead of `一日中(いちにちじゅう)`.
- **Literary readings**: `私` → `わたくし` rather than `わたし`.
- **Proper nouns and names**: plausible reading but not guaranteed (`田中(たなか)健太(けんた)` is correct here, but nothing assures it).
- **No exception dictionary**: no way to force a reading. You must review and correct manually.

## Behavior in Documents

- **Selection only** — nothing happens without a selection.
- **Formatting of the passage is lost**: text is deleted then reinserted, adopting the style at the start of the range (bold, colors, partial links disappear).
- Running again on already-annotated text is safe: `stripFurigana()` removes existing `(かな)` before analysis, result is identical. However, manually corrected readings will be overwritten.
- Only text elements are processed. Tables, headers/footers, comments, drawing areas are only touched if Docs includes them in the current selection (often not).
- No "remove furigana" function — use Ctrl+Z, or Find/Replace with `([一-鿿])[(（][ぁ-ゟ]+[)）]` → `$1` (regex enabled).
- ASCII parentheses `( )` in output: Google Docs has no native ruby tags.

## Apps Script Quotas

- `UrlFetchApp`: 20,000 calls/day (free account); 1 call per menu execution (more if text contains `/`).
- Execution limited to 6 minutes — not an issue for normal selections.
