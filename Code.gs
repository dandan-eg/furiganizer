/**
 * Adds furigana in parentheses after each kanji word.
 *
 *   addFurigana('昨日映画を見ました')
 *   → '昨日(きのう)映画(えいが)を見(み)ました'
 *
 * Powered by the Mikann API (free, no API key, Sudachi-based):
 *   https://github.com/NoHeartPen/fast-mikann-api
 */

const FURIGANA_ENDPOINT = 'https://fast-mikann-api.vercel.app/ruby/';
const KANJI = /[一-鿿㐀-䶿]/;

function onOpen() {
  DocumentApp.getUi()
    .createMenu('ふりがな')
    .addItem('ふりがなを付ける', 'furiganizeSelection')
    .addToUi();
}

/** Replaces the selected text with its furigana-annotated version. */
function furiganizeSelection() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) {
    DocumentApp.getUi().alert('テキストを選択してください。');
    return;
  }

  const ranges = selection.getRangeElements().filter(range => range.getElement().editAsText);

  // Walk backwards so insertions don't shift the offsets of the ranges left to process.
  for (let i = ranges.length - 1; i >= 0; i--) {
    const text = ranges[i].getElement().asText();
    const start = ranges[i].isPartial() ? ranges[i].getStartOffset() : 0;
    const end = ranges[i].isPartial() ? ranges[i].getEndOffsetInclusive() : text.getText().length - 1;
    if (end < start) continue;

    const sentence = text.getText().substring(start, end + 1);
    const result = addFurigana(sentence);
    if (result === sentence) continue;

    text.deleteText(start, end);
    text.insertText(start, result);
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

  const res = UrlFetchApp.fetch(FURIGANA_ENDPOINT + encodeURIComponent(sentence));

  return res.getContentText()
    .replace(/<ruby><rb>(.*?)<\/rb><rt>(.*?)<\/rt><\/ruby>/g, '$1($2)')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}
