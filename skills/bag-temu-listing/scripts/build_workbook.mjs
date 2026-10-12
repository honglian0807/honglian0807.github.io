import fs from 'node:fs/promises';
import path from 'node:path';
import {FileBlob,SpreadsheetFile} from '@oai/artifact-tool';

// Copy this script into a private scratch builder directory with runtime node_modules.
// Run using CODEX_PRIMARY_RUNTIME_NODE. Read the Spreadsheets skill and run its marker first.
const [manifestPath, templatePath, outputPath] = process.argv.slice(2);
if (!manifestPath || !templatePath || !outputPath) throw Error('Usage: build_workbook.mjs MANIFEST TEMPLATE OUTPUT.xlsx');
const p = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
if (!p.product_number || !Number.isFinite(p.declared_rmb) || p.declared_rmb <= 0 || !Number.isFinite(p.cny_per_usd) || p.cny_per_usd <= 0) throw Error('Product number, RMB price and sourced exchange rate required');
if (!p.exchange_rate_source || !p.exchange_rate_date) throw Error('Record the exchange rate source and date');
for (const key of ['title_cn','title_en']) if (!p[key] || p[key].length > 250 || /\p{P}/u.test(p[key])) throw Error('Titles must be present, <=250 characters and punctuation free');
if (!Array.isArray(p.variants) || !p.variants.length) throw Error('At least one color variant required');
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(templatePath));
const sheet = workbook.worksheets.getItem('导入模板');
const originalHeaders = sheet.getRange('A1:AY1').values;
const h = originalHeaders[0];
if (h.length !== 51 || h[0] !== '*产品标题' || h[1] !== '*英文标题' || h[2] !== '产品描述' || h[10] !== 'SKU货号' || h[41] !== '包装清单' || h[50] !== '产地') throw Error('Original 51-column template required');
const main = p.variants[0]?.images?.[0]?.url;
const rows = [], skus = new Set(), allImages = new Set();
const numericStock = v => { if (!Number.isInteger(v) || v < 0) throw Error('Stock must be a nonnegative integer'); return v; };
for (const variant of p.variants) {
  const imgs = variant.images;
  if (!Array.isArray(imgs) || imgs.length < 5 || imgs.length > 12) throw Error('Each color requires 5 to 12 images');
  const urls = imgs.map(i => i.url);
  if (urls.some(u => typeof u !== 'string' || !u.startsWith('https://i.ibb.co/')) || new Set(urls).size !== urls.length) throw Error('Unique verified HTTPS direct image URLs required');
  for (const url of urls) { if (allImages.has(url)) throw Error('Each color must have its own independent image set'); allImages.add(url); }
  const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  for (const i of imgs) {
    const words = String(i.paragraph || '').trim().split(/\s+/).length;
    if (words < 25 || words > 50 || /[\u4e00-\u9fff]/u.test(i.paragraph || '')) throw Error('Each image needs 25 to 50 English words');
  }
  let sku = p.product_number;
  if (p.variants.length > 1) {
    if (!variant.color_name || !variant.color_en || !/^[A-Z]+(?: [A-Z]+)*$/.test(variant.color_en)) throw Error('Multi-color needs confirmed original name and uppercase English color with spaces only');
    sku += '-' + variant.color_en;
  }
  if (skus.has(sku)) throw Error('Duplicate SKU');
  skus.add(sku);
  const row = Array(51).fill(null);
  const vals = {A:p.title_cn,B:p.title_en,C:imgs.toReversed().map(i => '<p><img src="'+escape(i.url)+'" /></p><p>'+escape(i.paragraph)+'</p>').join(''),D:p.product_number,E:'颜色',F:variant.color_name || '单色',I:urls[0],J:p.declared_rmb,K:sku,L:25,M:22,N:12,O:450,U:'软包装+软物',V:'软包装+软物',X:Math.round(p.declared_rmb*4/3/p.cny_per_usd*100)/100,Y:numericStock(variant.stock ?? p.stock ?? 50),Z:2,AA:'否',AF:'单品',AH:'件',AL:1,AR:'否',AY:'中国-广东省',S:urls.join('\n'),T:main};
  for (const [col,val] of Object.entries(vals)) row[[...col].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0)-1] = val;
  rows.push(row);
}
sheet.getUsedRange().clear({applyTo:'contents'});
sheet.getRange('A1:AY1').values = originalHeaders;
sheet.getRange('A2').write(rows);
sheet.getRange('J2:J'+(rows.length+1)).setNumberFormat('0.00');
sheet.getRange('X2:X'+(rows.length+1)).setNumberFormat('0.00');
workbook.recalculate();
for (const row of sheet.getRange('A2:AY'+(rows.length+1)).values) {
  if (row[6] || row[7] || row[41] || row[42]) throw Error('Size and packaging list fields must be blank');
  if (row[11]!==25 || row[12]!==22 || row[13]!==12 || row[14]!==450) throw Error('Bag package defaults changed');
  if (JSON.stringify([...row[2].matchAll(/<img src="([^"]+)"/g)].map(m=>m[1])) !== JSON.stringify(row[18].split('\n').toReversed())) throw Error('Description must reverse every carousel image');
}
await fs.mkdir(path.dirname(outputPath),{recursive:true});
await (await SpreadsheetFile.exportXlsx(workbook)).save(outputPath);
console.log(JSON.stringify({output:outputPath,sku_count:rows.length,suggested_usd:rows[0][23],images_per_color:p.variants.map(v=>v.images.length),description_order:'reverse',exchange_rate:p.cny_per_usd}));
