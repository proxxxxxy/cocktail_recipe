/**
 * Cache-buster stamper
 *
 *   node tools/stamp-version.js           rewrite the ?v= on both assets
 *   node tools/stamp-version.js --check   exit 1 if index.html is stale
 *
 * index.html loads style.css and app.js with a shared ?v= marker, because the
 * site is read on a phone against GitHub Pages, where a stale cached asset is
 * indistinguishable from a fix that did not work.
 *
 * Keeping that marker in step by hand does not survive contact with a long
 * session: forget it once and you spend the next ten minutes debugging a page
 * that is not running your code. So the marker is derived — today's date, and
 * eight characters of a hash over the two files it is protecting. Same bytes,
 * same stamp; one byte different, new stamp.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const ASSETS = ['style.css', 'app.js'];
const checkOnly = process.argv.includes('--check');

const hash = crypto.createHash('sha1');
for (const name of ASSETS) hash.update(fs.readFileSync(path.join(root, name)));

// Local date, not UTC: the readable half of the stamp should match the day
// the person editing thinks it is, which after midnight in Tokyo is not the
// day toISOString() would give them.
const now = new Date();
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
].join('');
const stamp = `${today}-${hash.digest('hex').slice(0, 8)}`;

const html = fs.readFileSync(indexPath, 'utf8');

// Every asset must carry the marker; one left behind is the whole point of
// this script defeated, so a missing ?v= is an error rather than a no-op.
for (const name of ASSETS) {
  if (!new RegExp(`${name.replace('.', '\\.')}\\?v=`).test(html)) {
    console.error(`${name} is loaded without a ?v= marker in index.html`);
    process.exit(1);
  }
}

const stamped = html.replace(
  /(style\.css|app\.js)\?v=[^"']*/g,
  (_, asset) => `${asset}?v=${stamp}`
);

if (checkOnly) {
  if (stamped === html) {
    console.log(`index.html is stamped correctly (?v=${stamp}).`);
  } else {
    console.error(`index.html is stale. Run: node tools/stamp-version.js`);
    process.exit(1);
  }
} else if (stamped === html) {
  console.log(`Already up to date (?v=${stamp}).`);
} else {
  fs.writeFileSync(indexPath, stamped);
  console.log(`Stamped ?v=${stamp} on ${ASSETS.join(' and ')}.`);
}
