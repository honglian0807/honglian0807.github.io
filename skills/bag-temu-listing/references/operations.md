# Reusable helpers

Use these only within the approved workflow. Read the relevant imagegen, Spreadsheets and Library skills for their actual runtime and persistence requirements. The helpers do not grant upload authorization or generate AI images.

## Image preparation

Supply a JSON array with one entry per final image:

```json
[{"source":"/absolute/generated-image.png","target":"/absolute/final/main.jpg"}]
```

Run `python3 scripts/prepare_images.py images.json`. It fits and centers without stretching, pads white when needed, fully decodes the output and checks 1500×1500. Visually inspect again if padding/cropping or scale changes affect composition. Use the verified final files for delivery and upload.

## ImgBB upload

Use the normal ImgBB upload capability with the user's already configured account or authorized credential. Obtain explicit authorization for the exact current product images and upload only those approved images. Do not retrieve secrets from another skill, copy another account's credentials, upload unrelated files or change routes after an approval rejection. Verify each returned direct image link before including it in the workbook. Preserve an image-to-link mapping and avoid blind duplicate uploads after an uncertain result.

## Workbook manifest

Generate and review truthful titles and one 25–50 word English paragraph for each image. Do not supply a material name unless verified. Keep images in **normal carousel order** in this manifest; the builder reverses pairs only in the description.

```json
{
  "product_number":"BFR8118",
  "declared_rmb":145,
  "cny_per_usd":6.6920,
  "exchange_rate_date":"2026-10-12",
  "exchange_rate_source":"https://www.investing.com/currencies/usd-cny-historical-data",
  "title_cn":"女士迷你菱格双肩包",
  "title_en":"Womens Mini Quilted Backpack",
  "variants":[{
    "color_name":"黑色",
    "color_en":"BLACK",
    "images":[{"url":"https://i.ibb.co/example/main.jpg","paragraph":"Supply 25 to 50 real English words for this image"}]
  }]
}
```

This is a schema illustration, not valid completed data: replace example URLs, expand to 5–12 real verified images, generate a suitable 230–250 character English title and 25–50 word paragraphs, and obtain a **fresh** sourced rate. Never reuse the example's historical rate as today's rate. `color_en` is required only for multi-color SKU generation. Actual bag dimensions are collected for image scale, not as size variants. Optional stock overrides must be explicit user instructions.

Set `template_path` to the bundled `assets/storekeeper_temu_template.xlsx`. If unavailable, materialize the exact original specified in template-fields.md using the Library skill and retain its returned path. Copy `scripts/build_workbook.mjs` into a private temporary builder directory. Symlink that directory's node_modules to CODEX_PRIMARY_RUNTIME_NODE_MODULES. Use CODEX_PRIMARY_RUNTIME_NODE, never system Node or an alternate workbook library. Render the source before editing and follow the Spreadsheets marker, checks and render workflow. Run:

```bash
"$CODEX_PRIMARY_RUNTIME_NODE" /absolute/builder/build_workbook.mjs /absolute/manifest.json "$template_path" /absolute/output/SKU_店小秘导入.xlsx
```

Inspect the exported workbook: original headers and example sheet, no size columns or suffixes, correct prices/package fields, all carousel links in normal order, all matching description pairs in reverse order, one square material image. Visually review relevant ranges without restyling the import template. Save the workbook using the Library skill and provide its final link. Preserve identity on corrections.
