---
layout: default
title: Furiganizer
---

# Furiganizer

Google Docs add-on that adds furigana in parentheses to selected text:

```
昨日映画を見ました  →  昨日（きのう）映画（えいが）を見（み）ました
```

## Usage

Select text, then **Extensions > Furiganizer > ふりがなを付ける**.

## Known Limitations

Readings produced by morphological analysis are sometimes incorrect for proper nouns
and rare readings. Formatting of the selection (bold, color, links) is lost during
replacement, and running the command twice on the same text produces nested parentheses.
Details: [LIMITATIONS](LIMITATIONS).

## Privacy

Selected text is sent to a third-party analysis service to get the readings.
Nothing is stored by the add-on. See the [Privacy Policy](PRIVACY) and
[Terms of Service](TERMS).

## Support

Questions and bug reports:
[github.com/dandan-eg/furiganizer/issues](https://github.com/dandan-eg/furiganizer/issues)

Source code: [github.com/dandan-eg/furiganizer](https://github.com/dandan-eg/furiganizer)
