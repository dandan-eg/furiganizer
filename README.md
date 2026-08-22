---
layout: default
title: Furiganizer
---

# Furiganizer

Google Apps Script (Google Docs) add-on that adds furigana in parentheses to **selected text**:

```
昨日映画を見ました  →  昨日（きのう）映画（えいが）を見（み）ました
```

## Installation (add-on, available on all your documents)

1. Open **a** Google Doc (it will serve as your development project) → **Extensions > Apps Script**.
2. Rename the project **Furiganizer** (this name will appear in the Extensions menu).
3. Paste the content of `Code.gs` into the editor.
4. **Project Settings > Show manifest file `appsscript.json`**, then replace it with the one from the repository.
5. **Deploy > Test deployments** → *Select type: Docs add-on* → **Install**.
6. Open any Google Doc: **Extensions > Furiganizer > ふりがなを付ける**.

The test deployment stays installed on your account: no Google validation needed, and the menu follows all your documents.

No API key required.

## Publishing (for everyone)

The test deployment above only works for your account. For anyone to be able to
install Furiganizer from the Google Workspace Marketplace, see **[PUBLISHING.md](PUBLISHING.md)**:
Cloud project, OAuth consent screen, store listing, Google review submission.

Required review documents, already written: [PRIVACY.md](PRIVACY.md) and [TERMS.md](TERMS.md)
(publish at stable `https://` URLs, e.g., via GitHub Pages).

## Usage

Select text, then **Extensions > Furiganizer > ふりがなを付ける**.

## Notes

- Back-end: [Mikann API](https://github.com/NoHeartPen/fast-mikann-api) (Sudachi, mode C), free and no key required.
- Morphological analysis is essential: 昨日 = きのう not さくじつ, 見ました → 見(み)ました, 日本語 = にほんご as one unit.
- Okurigana stay outside parentheses: 食べて → 食(た)べて, 走って → 走(はし)って.
- Readings sometimes incorrect, formatting lost, don't run twice: see [LIMITATIONS.md](LIMITATIONS.md) before sharing the script.
