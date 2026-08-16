/**
 * Adds furigana in full-width parentheses after each kanji word.
 *
 *   addFurigana('昨日映画を見ました')
 *   → '昨日（きのう）映画（えいが）を見（み）ました'
 *
 * Powered by the Mikann API (free, no API key, Sudachi-based):
 *   https://github.com/NoHeartPen/fast-mikann-api
 */

const FURIGANA_ENDPOINT = 'https://fast-mikann-api.vercel.app/ruby/';
const KANJI = /[一-鿿㐀-䶿]/;

function onOpen() {
  // createAddonMenu() nests the menu under Extensions > Furiganizer, which is
  // where users of a published add-on expect to find it.
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem('ふりがなを付ける', 'furiganizeSelection')
    .addToUi();
}

/** Runs when the add-on is installed; the menu must appear without a reload. */
function onInstall(e) {
  onOpen(e);
}

/** Replaces the selected text with its furigana-annotated version. */
function furiganizeSelection() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) {
    DocumentApp.getUi().alert('テキストを選択してください。');
    return;
  }

  const ranges = selection.getRangeElements().filter(range => range.getElement().editAsText);

  // Resolve every reading before touching the document, so a network failure
  // leaves the selection untouched rather than half-annotated.
  let edits;
  try {
    edits = ranges.map(range => {
      const text = range.getElement().asText();
      const start = range.isPartial() ? range.getStartOffset() : 0;
      const end = range.isPartial() ? range.getEndOffsetInclusive() : text.getText().length - 1;
      if (end < start) return null;

      const sentence = text.getText().substring(start, end + 1);
      const result = addFurigana(sentence);
      return result === sentence ? null : { text, start, end, result };
    });
  } catch (err) {
    DocumentApp.getUi().alert('ふりがなの取得に失敗しました。しばらくしてからもう一度お試しください。\n\n' + err.message);
    return;
  }

  // Walk backwards so insertions don't shift the offsets of the ranges left to process.
  for (let i = edits.length - 1; i >= 0; i--) {
    if (!edits[i]) continue;
    edits[i].text.deleteText(edits[i].start, edits[i].end);
    edits[i].text.insertText(edits[i].start, edits[i].result);
  }
}

/**
 * @param {string} sentence
 * @return {string}
 */
function addFurigana(sentence) {
  if (!KANJI.test(sentence)) return sentence;

  // Strip any existing furigana first, so running this twice is a no-op.
  const plain = stripFurigana(sentence);

  // The API takes the sentence in the URL path, so a '/' would 404. Split and rejoin.
  return plain.split('/').map(fetchFurigana).join('/');
}

/** Removes (かな) / （かな） groups that directly follow a kanji. */
function stripFurigana(sentence) {
  return sentence.replace(/([一-鿿㐀-䶿])[(（][ぁ-ゟー]+[)）]/g, '$1');
}

/** Fetches the ruby-tagged HTML and converts it to parenthesised readings. */
function fetchFurigana(sentence) {
  if (!KANJI.test(sentence)) return sentence;

  const res = UrlFetchApp.fetch(FURIGANA_ENDPOINT + encodeURIComponent(sentence), { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    throw new Error('API ' + res.getResponseCode());
  }

  return res.getContentText()
    .replace(/<ruby><rb>(.*?)<\/rb><rt>(.*?)<\/rt><\/ruby>/g, '$1（$2）')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}
