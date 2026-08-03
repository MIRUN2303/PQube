const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const slidesDir = path.join(root, 'public', 'images', 'portfolio', 'slides');
const slides = Array.from({ length: 14 }, (_, i) => `slide-${String(i + 1).padStart(2, '0')}.jpg`);

const pagesHtml = slides
  .map((f) => `<div class="page"><img src="${pathToFileURL(path.join(slidesDir, f)).href}" /></div>`)
  .join('');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #ffffff; }
  .page { width: 1280px; height: 720px; page-break-after: always; break-after: page; }
  .page:last-child { page-break-after: auto; break-after: auto; }
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>
</head>
<body>${pagesHtml}</body>
</html>`;

(async () => {
  const tmpHtml = path.join(root, 'scripts', '.deck-preview.html');
  fs.writeFileSync(tmpHtml, html);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(`file:///${tmpHtml.replace(/\\/g, '/')}`);
  await page.waitForTimeout(1500);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: path.join(root, 'public', 'images', 'portfolio', 'PQube-Company-Profile.pdf'),
    width: '1280px',
    height: '720px',
    pageRanges: '1-14',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  fs.unlinkSync(tmpHtml);
  console.log('PDF created');
})();
