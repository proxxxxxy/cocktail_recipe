/**
 * recipes.md generator
 *
 * recipes.md is a rendering of the cocktailDatabase in app.js — app.js is the
 * only source of truth. Run this after adding or editing a recipe:
 *
 *   node tools/gen-recipes.js           regenerate recipes.md
 *   node tools/gen-recipes.js --check   exit 1 if recipes.md is out of date
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const checkOnly = process.argv.includes('--check');
const target = path.join(root, 'recipes.md');

const ICE = { cube: 'キューブアイス', crushed: 'クラッシュアイス', none: '氷なし' };

// Section order and headings. A base spirit missing from this list is an error
// rather than a silent omission from the document.
const SECTIONS = [
  ['gin', 'ジンベースのカクテル', 'Gin Base'],
  ['vodka', 'ウォッカベースのカクテル', 'Vodka Base'],
  ['rum', 'ラムベースのカクテル', 'Rum Base'],
  ['tequila', 'テキーラベースのカクテル', 'Tequila Base'],
  ['whiskey', 'ウイスキーベースのカクテル', 'Whiskey Base'],
  ['brandy', 'ブランデーベースのカクテル', 'Brandy Base'],
  ['peach', 'ピーチリキュールベースのカクテル', 'Peach Base'],
  ['cassis', 'カシスリキュールベースのカクテル', 'Cassis Base'],
  ['coffee', 'コーヒーリキュールベースのカクテル', 'Coffee Base'],
];

/**
 * app.js touches window/document as soon as it loads, so it cannot simply be
 * required. Slice the database literal out by brace matching — tracking string
 * literals so that a brace inside a description cannot end the object early.
 */
function readDatabase() {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const start = source.indexOf('const cocktailDatabase = {');
  if (start === -1) throw new Error('cocktailDatabase not found in app.js');

  const open = source.indexOf('{', start);
  let depth = 0;
  let quote = null;

  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) {
      return eval('(' + source.slice(open, i + 1) + ')');
    }
  }
  throw new Error('unterminated cocktailDatabase literal in app.js');
}

function build(db) {
  // A few cocktails are reachable under more than one key (margarita, for
  // one). The document lists each drink once, under the key declared first.
  const seen = new Set();
  const byBase = new Map(SECTIONS.map(([key]) => [key, []]));

  for (const [key, data] of Object.entries(db)) {
    if (seen.has(data.name)) continue;
    seen.add(data.name);
    const base = key.split('+')[0];
    if (!byBase.has(base)) {
      throw new Error(`"${key}" uses base "${base}", which has no section in SECTIONS`);
    }
    byBase.get(base).push({ key, data });
  }

  const total = seen.size;
  const lines = [
    '# カクテル・レシピ集 (実在カクテル厳選版)',
    '',
    `本書は、9種のベース（6大スピリッツ ＋ 3種のリキュール）と各種割り材を組み合わせた、実在するスタンダードカクテル（IBA公認レシピ含む全${total}種類）のレシピ集です。架空のカクテルは収録せず、各カクテルに最適な**氷のスタイル（キューブアイス、クラッシュアイス、氷なし）**を明記しています。`,
    '',
    '> このファイルは `app.js` のカクテルデータベースから自動生成されています。内容を変更する場合は `app.js` を編集し、`node tools/gen-recipes.js` を実行してください。',
    '',
    '---',
    '',
  ];

  let n = 0;
  SECTIONS.forEach(([base, jp, en], index) => {
    const items = byBase.get(base);
    lines.push(`## ${index + 1}. ${jp} (${en} - ${items.length}種類)`, '');

    for (const { key, data } of items) {
      n++;
      const iba = data.isIBA ? ' 【IBA公認】' : '';
      const ice = ICE[data.ice] + (data.saltRim ? '（グラスのフチに塩）' : '');
      const materials = data.ingredients.map(i => `${i.name}：${i.amount}`).join('、');
      lines.push(
        `### ${n}. ${data.name} (${data.enName})${iba}`,
        `*   **組み合わせ**: ${key.split('+').join(' + ')}`,
        `*   **度数**: 約 ${data.abv}% | **味わい**: ${data.taste.join('・')} | **氷のスタイル**: ${ice}`,
        `*   **材料**: ${materials}`,
        `*   **作り方**: ${data.method.join(' ')}`,
        '',
      );
    }
    lines.push('---', '');
  });

  return { markdown: lines.join('\n'), total };
}

const { markdown, total } = build(readDatabase());

if (checkOnly) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (current === markdown) {
    console.log(`recipes.md is up to date (${total} cocktails).`);
  } else {
    console.error('recipes.md is out of date. Run: node tools/gen-recipes.js');
    process.exit(1);
  }
} else {
  fs.writeFileSync(target, markdown);
  console.log(`Wrote recipes.md — ${total} cocktails across ${SECTIONS.length} sections.`);
}
