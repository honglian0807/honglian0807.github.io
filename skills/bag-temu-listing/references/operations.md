# Reusable helpers

Use these only within the approved workflow. Read the relevant imagegen, Spreadsheets and Library skills for their actual runtime and persistence requirements. The helpers do not grant upload authorization or generate AI images.

## Image preparation

Supply a JSON array with one entry per final image:

```json
[{"source":"/absolute/generated-image.png","target":"/absolute/final/main.jpg"}]
```

Run `python3 scripts/prepare_images.py images.json`. It fits and centers without stretching, pads white when needed, fully decodes the output and checks 1500×1500. Visually inspect again if padding/cropping or scale changes affect composition. Use the verified final files for delivery and upload.

Create a second JSON list containing ALL distinct final paths, e.g. `[{"path":"/absolute/final/main.jpg"}]`, and run `python3 scripts/prepare_images.py --check-only final-images.json`. This must pass for every shared carousel image and SKU preview before approval, upload or workbook completion. Every final file must be exactly 1500×1500; a generic portrait preference does not change the bag-specific square requirement. Native imagegen output at a different pixel size is a draft, even when square.

## ImgBB upload

Use the normal ImgBB upload capability with the user's already configured account or authorized credential. Obtain explicit authorization for the exact current product images and upload only those approved images. Do not retrieve secrets from another skill, copy another account's credentials, upload unrelated files or change routes after an approval rejection. Verify each returned direct image link before including it in the workbook. Preserve an image-to-link mapping and avoid blind duplicate uploads after an uncertain result.

Decode the actual hosted original image and verify 1500×1500 for every URL. ImgBB's HTML original embed can use a lower-resolution preview; take the full-size download link from the image page when necessary. Check the hosted bytes against the approved local file and never finalize with thumbnail or preview URLs.

## Workbook manifest

Generate and review truthful titles and one 25–50 word English paragraph for each shared carousel image. Do not supply a material name unless verified. Put ONE `carousel_images` list of **EXACTLY 10 images** at product level in **normal order**. Randomly mix confirmed colors with varied angles, details and different scene settings; include at least three real-use settings. Never place image sets under variants. The builder repeats the SAME ten-image carousel and reverse-order description in all SKU rows. Keep each SKU preview as its own approved clean full-bag main image.

```json
{
  "product_number":"BFR8118",
  "declared_rmb":145,
  "bag_dimensions_cm":{"length":21,"width":12,"height":20},
  "cny_per_usd":6.6920,
  "exchange_rate_date":"2026-10-12",
  "exchange_rate_source":"https://www.investing.com/currencies/usd-cny-historical-data",
  "title_cn":"女士迷你菱格双肩包",
  "title_en":"Womens Mini Quilted Backpack",
  "carousel_images":[{"role":"main","color_en":"BLACK","path":"/absolute/final/main.jpg","url":"https://i.ibb.co/example/main.jpg","paragraph":"Supply 25 to 50 real English words for this image"}],
  "variants":[{"color_name":"黑色","color_en":"BLACK","preview":{"role":"main","color_en":"BLACK","path":"/absolute/final/main.jpg","url":"https://i.ibb.co/example/main.jpg"}}]
}
```

This is a schema illustration, not completed data: replace example URLs, expand the single shared list to EXACTLY 10 real verified images, generate a suitable 230–250 character English title and 25–50 word paragraphs, and obtain a **fresh** sourced rate. Never reuse the example's historical rate as today's rate. For multiple colors, each carousel image's `color_en` must match its depicted confirmed variant. Mark genuine clean full-bag main images `role: "main"`; the first carousel image must be main. Use `angle`, `detail` or `scene` for other shots. Set each variant's `preview` to its own approved color main `{role:"main",color_en,path,url}`, preserving an existing preview and URL. If omitted, the builder reuses only a matching clean main from the carousel, never an arbitrary matching-color shot. Single color defaults to the shared main. When a new SKU color has no approved main, prepare one clean main for its preview; keep the shared carousel at ten and do not generate another per-color set. Upload each distinct approved file once and reuse its URL.

Actual bag dimensions are collected for image scale and calculating package dimensions, not as size variants. Set `bag_dimensions_cm` to the user's confirmed actual measurements in cm, using positive numeric `length`, `width`, `height` fields. For photos labelled horizontal width × vertical height × depth, map those to length × height × width respectively. The example 21 wide × 20 high × 12 deep yields package length 22 × width 13 × height 21 cm. The builder adds exactly 1 cm per axis; do not supply already increased package values. Omit `bag_dimensions_cm` only when no actual dimensions were supplied, so the builder falls back to 25×22×12 cm. Do not pass partial, conflicting, null or invalid dimensions. Optional stock overrides must be explicit user instructions.

Set `template_path` to the bundled `assets/storekeeper_temu_template.xlsx`. If unavailable, materialize the exact original specified in template-fields.md using the Library skill and retain its returned path. Copy BOTH `scripts/build_workbook.mjs` and its companion `scripts/prepare_images.py` into the same private temporary builder directory. Symlink that directory's node_modules to CODEX_PRIMARY_RUNTIME_NODE_MODULES. Use CODEX_PRIMARY_RUNTIME_NODE, never system Node or an alternate workbook library. Render the source before editing and follow the Spreadsheets marker, checks and render workflow. Run:

```bash
"$CODEX_PRIMARY_RUNTIME_NODE" /absolute/builder/build_workbook.mjs /absolute/manifest.json "$template_path" /absolute/output/SKU_店小秘导入.xlsx
```

Each manifest image requires an absolute local `path` pointing to its approved 1500×1500 final file. The builder checks actual pixel dimensions and full decoding rather than trusting manually supplied width/height metadata. It rejects incorrect sizes and always fills **9 days** in column Z for every bag SKU.

Inspect the exported workbook: original headers and example sheet, no size columns or suffixes, correct prices/package fields, SAME shared carousel links in normal order in every SKU row, SAME matching description pairs in reverse order, matching-color SKU previews, one common square material image, every hosted image at 1500×1500 and every SKU's dispatch time at 9. Visually review relevant ranges without restyling the import template. Save the workbook using the Library skill and provide its final link. Preserve identity on corrections.
