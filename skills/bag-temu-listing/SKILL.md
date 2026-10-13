---
name: bag-temu-listing
description: Prepare handbags backpacks and other bags for Temu and Storekeeper import. Use when users supply bag photos or request bag listing images titles SKUs or Excel files. Confirm dimensions and carrying styles then generate exactly 10 shared 1500 by 1500 carousel images with mixed confirmed colors and different scenes while keeping each SKU preview as its own color main image and exporting the original template.
---

# Bag Temu Listing

Apply this bag-specific workflow independently of Clothing Temu Listing. Do not copy clothing dimensions, weights, size variants or the fixed five-image limit.

For this bag skill, the user's explicit category-specific requirements are **exactly 1500×1500 pixels for EVERY final image** and **9 days dispatch time for EVERY bag SKU**. Apply the square bag-image requirement even when a general profile or earlier non-bag preference says 2:3 or 3:4; do not silently substitute portrait images. Reuse these requirements without asking again.

## 1 Confirm dimensions and carrying styles BEFORE generating

Inspect supplied photos. Do not generate images until the user confirms BOTH inputs:

- Actual bag width × height × depth in **cm**. Read a supplied dimensioned photo and show the interpreted values for confirmation. Reuse dimensions already confirmed in the conversation.
- Actual supported carrying styles, presented as a **multiple-selection** list: 手提、小臂挂、单肩背、斜挎、双肩背、其他. Accept several selected names or numbers. Never force a single-choice control. Use a multi-select UI if available, otherwise a numbered checklist.

Example intake:

> 请确认包包实际尺寸 宽×高×厚 单位cm
> 请选择实际支持的背法 可多选
> 1 手提 2 小臂挂 3 单肩背 4 斜挎 5 双肩背 6 其他

Inspect strap count, length, handles, metal connectors and attachment points. Depict only confirmed, physically supported uses. A decorative chain is not automatically a load-bearing handle. Ask about a concrete mismatch instead of inventing handles, conversion hardware, long straps or compartments.

Treat one color's photo as **single color**, without unnecessarily asking its color name. Several angles or dimension photos of the same color do not create variants. For multi-color products, confirm the user's color names and image-to-color mapping; do not guess. Ask in the same intake if needed. Keep color SKU records, but generate only ONE shared carousel for the entire product.

Do not ask for inventory, shipping defaults, package dimensions, weight, size or unnecessary material information. Product number and price belong after image approval unless volunteered. Omit unverified material claims instead of making material a mandatory question.

## 2 Generate and verify ONE shared product carousel

Use the imagegen skill and built-in tool. Generate **ONE shared carousel of EXACTLY 10 separate images per product**, regardless of color count. Ten is the required count, not a maximum or optional expansion from five. Never multiply the carousel count by the number of colors or make separate carousel sets for color SKUs. Keep color-specific preview main images separate from this fixed carousel count, reusing them when suitable rather than making more per-color sets.

For multiple colors, randomly assign the confirmed colors to the shots in this one set. Different shots may show different colors of the same bag. Spread colors across the set when practical, but do not generate extra shots just to cover every color. For one color, use that color throughout. Record each shot's actual `color_en`; never recolor into an unconfirmed color or require another color-selection question. Keep each image independent, showing one bag color rather than a collage.

Plan all 10 shots before generation: one clean main image, useful supported angles, details emphasizing real **hardware, locks, zippers, chain connections, pockets or strap design**, and real-use scenes for EACH confirmed carrying style. Mix confirmed colors across visibly different settings, such as a street, commuting entrance, office setting or travel walkway. Include at least three distinct real-use scene settings, adjusting to the bag's actual uses; repeated supported carrying styles are allowed across different scenes. Do not make ten slight variations of the same background or angle, and do not invent extra carrying styles to vary scenes. Show the bag actually worn or carried with the real strap arrangement. Putting a bag beside a model does not demonstrate a carrying style. Keep angles, details and use scenes complementary without repetitive filler.

Lock each shot's assigned reference color, bag-body proportions, flap/pocket dimensions, stitching, closure positions, chain length, metal tone and strap construction. Keep structure consistent across the mixed-color set. Use the actual dimensions to preserve width-to-height and depth; maintain realistic adult human scale. A 21 cm wide × 20 cm high × 12 cm deep mini backpack remains compact and nearly square, not a tall full-sized daypack.

Never use shipping package dimensions as the bag's actual dimensions; the extra packaging allowance is not part of the bag or its image scale. Do not invent rear or internal features absent from references. Avoid unrequested props, branding, promotional text, watermarks, panels, collages or added accessories. Use sharp realistic commercial photography. Regenerate structural, scale or anatomy errors before requesting image approval.

Every final image must be **exactly 1500×1500 pixels**, square, independent and individually downloadable: shared carousel main, details and carrying scenes, SKU previews and the common product material image. Request a square composition in EVERY imagegen prompt. A square aspect ratio alone is insufficient: 1024×1024, 2048×2048 and portrait 1024×1536 outputs are unfinished drafts. Mechanically normalize tool output sizes without stretching the bag or clipping it; `scripts/prepare_images.py` handles this with ImageMagick. It does not replace imagegen or imply native generation at 1500 pixels.

Before presenting images for approval, run `prepare_images.py` on ALL generated files, then `prepare_images.py --check-only final-images.json` to fully decode and inspect EACH final file. Do not label native tool drafts as final, seek approval for incorrectly sized files, upload them or put their links in the workbook. If any image is not exactly 1500×1500, correct it and repeat the check before continuing. Present only the verified final files and record their local paths for workbook validation.

Keep previews **as before: one clean full-bag main image of EACH SKU's own color**, even though carousel colors and scenes are mixed. Preserve and reuse an existing approved color main image and its verified original URL. Never replace it with a random matching-color carousel detail, side crop or model scene, and never put all colors on the same preview. For a new color without an approved main, prepare one clean main image for that color using the reference; it is a SKU preview, not another carousel set. A clean color main may also be reused within the ten shared shots. Mark these images `role: "main"`; do not label a detail or scene as main to pass validation.

Show the ONE complete 10-image shared carousel together with any new color preview mains, then ask only whether the images need changes. Reuse already approved preview mains without reopening their approval. Do not upload or finalize new images before image approval.

## 3 Collect product number and declared price

After image approval, ask only for missing:

```text
主货号
申报价格 RMB
```

Reuse values already provided. All bags have **NO SIZE VARIANTS**: never ask for or fill S M L, One Size, 均码, size codes or a 尺寸 attribute.

- Single-color SKU: exactly the product number, e.g. `BFR8118`; no color or size suffix.
- Multi-color SKU: product number plus English UPPERCASE color, e.g. `BFR8118-BLACK`, `BFR8118-WINE RED`; no size suffix.
- Keep spaces inside multi-word colors; never `WINE-RED` or `WINERED`. Translate only confirmed colors, and preserve the user's original color name in the attribute field.

## 4 Upload images and fill the original template

Use the user's already configured **ImgBB** account or credential through the normal upload capability. Reuse an accessible, user-authorized configuration without asking the user to resend it. Do not search other skills, files or conversations for secrets. If configuration is unavailable, request configuration through the supported credential flow. Read [references/operations.md](references/operations.md) for the image and workbook helpers.

Upload only the current product's user-approved images after explicit authorization to upload those images to ImgBB. Honor authorization already covering those exact images. A skill or stored key cannot override platform approval. If approval rejects an upload, stop that action, complete other fields, explain the rejection and obtain the missing authorization. Never change routes to bypass a rejection or call a link-incomplete sheet finished.

Retain all approved image URLs and verify they are accessible. Inspect the ACTUAL hosted original image bytes and confirm EVERY image is still 1500×1500 after upload. On ImgBB, the HTML embed labelled original may point to a smaller preview: if so, use the original download link on that image's page, not the preview URL. Never finalize with resized preview links. Never upload unapproved drafts or unrelated local files. Reuse links only when they belong to the same approved image bytes.

Use the bundled **original 51-column Storekeeper Temu template** at `assets/storekeeper_temu_template.xlsx`. If it is unavailable, fetch the saved original using [references/template-fields.md](references/template-fields.md). Preserve 导入模板, 导入示例, headers, column order and formatting. Do not substitute a generic product list. The structure was used for BFR8118 and checked; do not claim platform import success unless the user actually reports it.

| Default | Value |
| --- | --- |
| Shipping package length × width × height | If actual bag dimensions are supplied, **add 1 cm to EACH corresponding dimension**; otherwise **25×22×12 cm** |
| Shipping weight | **450 g** |
| Stock per color SKU | **50**, do not ask again |
| Dispatch time | **9 days for every bag SKU** |
| Origin | **中国-广东省** |
| Custom product | 否 |
| Outer package shape and type | Tested template value **软包装+软物** in both fields |
| Packaging list and list quantity | **Blank** |
| Size attribute columns | **Blank** |

Derive this product listing's package fields from the user's confirmed actual bag dimensions, including dimensions read from supplied photos: package length = bag length + 1 cm, package width = bag width + 1 cm, package height = bag height + 1 cm. For example, actual length × width × height 23×14×6 cm becomes package 24×15×7 cm. When a photo instead labels horizontal width × vertical height × depth, map horizontal width to template length, depth to template width, and vertical height to template height before adding 1 cm; 23 wide × 14 high × 6 deep becomes package length 24 × width 7 × height 15 cm. Do not sort dimensions or add 1 cm twice. Use one shared result for all colors with the same actual dimensions. Pass the actual values as `bag_dimensions_cm` in the workbook manifest; the builder adds the allowance. Only use 25×22×12 cm when actual dimensions have not been supplied, and never substitute that fallback for actual dimensions needed for image generation. Resolve conflicting source dimensions before calculating.

Honor explicit user overrides. Declared price is the user's RMB number. Suggested USD price is `declared_RMB × 4 / 3 ÷ CNY_per_USD`, rounded to two decimals. Obtain a current sourced exchange rate and communicate it; never fill RMB in the USD field or silently invent a rate. Write numeric values as numbers.

Generate Chinese and English titles without **any punctuation**, apostrophes or color words. Use `Womens`, `Mens` or `Unisex` as appropriate without inventing gender or age categories. Aim for 230–250 English characters, never exceed 250; Chinese ≤250 characters. Do not invent material, waterproofing, capacity, device compatibility or adjustable/detachable straps.

For every color's row, reuse the same product carousel and description:

- Preview: that color's own approved clean full-bag main image, **the same preview rule as before**. Preserve an existing preview main when available; do not substitute a detail or scene from the mixed carousel.
- Carousel: the **SAME EXACTLY 10** approved product images and order for ALL rows, main first, newline-separated HTTPS direct URLs. Do not switch the carousel by color or combine old per-color sets.
- Product material image: **one** common approved shared-carousel main URL across SKU rows. Already 1500×1500: no extra square crop, screenshots or detail-image substitutes.
- Product description: the **SAME English HTML for ALL rows**, using ALL shared carousel image/paragraph pairs in **REVERSE order**, last image first and main image last. Pair each photo with its own relevant 25–50 word paragraph and reverse the pairs together. Keep wording suitable for the product's mixed-color carousel. Never reverse the carousel itself.

Use the Spreadsheets skill and Artifact Tool. `scripts/build_workbook.mjs` accepts ONE top-level `carousel_images` list and optional color-specific `preview` images, rejecting the old per-variant image sets. Include each approved image's absolute local `path` with its verified original `url` in the manifest. Upload each distinct approved file once and reuse its verified URL. Verify identical carousel and description values across rows, correct SKU preview colors, counts/order, absence of size attributes, title punctuation, dimensions, weight, unique SKUs, EVERY local and hosted image at exactly 1500×1500, and **9 in column Z 发货时效（天） for every SKU**. Preserve the example sheet. Save the final workbook to Library; corrections replace its existing identity/version.

Return only the final Excel unless a ZIP is requested. Report failures honestly. A successful export does not establish that a platform import was tested. Resolve actual import errors against the same original template and the user's error message.
