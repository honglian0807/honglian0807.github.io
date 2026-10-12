---
name: clothing-temu-listing
description: Prepare clothing products for Temu and Storekeeper import by creating or reviewing five-image e-commerce sets, generating gender-specific titles and SKUs, uploading approved images to ImgBB, writing English image-linked descriptions, and exporting the final Excel workbook. Use when a user provides clothing photos and asks for a Temu listing, product upload sheet, SKU setup, or reusable clothing publishing workflow.
---

# Clothing Temu Listing

Follow this workflow for clothing products intended for Temu or a 店小秘/Storekeeper import sheet.

## Mandatory sequence

Always complete the image stage before collecting listing information. After receiving a garment photo, generate and display exactly five images first. Do not ask for the main product number, gender, colors, sizes, price, or logistics information before the five images have been shown. Ask only for image feedback at this stage.

The output must be five separate downloadable image files, never a collage, contact sheet, combined grid, or partial set: image 1 is the main image, and images 2–5 are four separate product-detail images.

Before generating, inspect the source garment and record its visible construction: garment category, color, neckline, sleeves, closures, pockets, panels, trims, hem, texture, and any logo or print. Preserve these details across all five images. Never invent a different garment structure or silently add/remove visible features.

Use this image-stage response:

> 图片已生成，请先确认这 5 张图是否需要修改。确认无误后，我再向你询问货号、性别、颜色、尺码和价格等上架信息。

Only after the user confirms the images, says no changes are needed, or otherwise clearly approves them may the workflow continue to information collection, image hosting, SKU creation, and workbook export.

## Image workflow

1. If the user provides one real product or garment photo, create exactly five separate e-commerce image files. Do not return only a preview collage or fewer than five files.
2. Assign the five images different jobs:
   - Image 1: clean front-facing main product image with a simple background and the garment clearly visible.
   - Image 2: back view or full rear construction view.
   - Image 3: neckline, collar, buttons, zipper, pocket, sleeve, or other key construction detail, selected according to the actual garment.
   - Image 4: fabric texture, stitching, hem, cuff, or another close-up detail that is actually present.
   - Image 5: natural full-body lifestyle or styling scene that still clearly shows the same garment.
3. Make the four detail images visibly different from the main image and from one another. Do not produce five near-identical model portraits.
4. Keep one consistent garment across the set: same color, proportions, design, trim, closure, pocket placement, sleeve length, neckline, and texture. Do not add logos, text, accessories, pockets, buttons, or patterns that are absent from the source.
5. Use realistic commercial apparel photography: sharp garment edges, natural fabric folds, believable body proportions, anatomically correct hands, clean lighting, and enough resolution for close inspection. Reject and regenerate any image with blur, warped clothing, duplicated limbs, malformed hands, broken closures, incorrect garment details, or obvious AI artifacts.
6. Check the set before showing it to the user. Confirm there are five separate files, the first is the main image, images 2–5 are distinct detail images, and the garment is consistent across all five.
7. Treat 1340×1785 pixels as a strict requirement for every final image file. Compose images in the matching near-3:4 frame; the exact 1340:1785 dimensions take precedence over any generic aspect-ratio guidance. After generation, inspect each file’s actual pixel dimensions. If any file differs, crop and resize it to exactly 1340×1785 without stretching or distorting the garment, then inspect the dimensions again. Do not show or deliver the set until all five separate files have been verified at exactly 1340×1785 pixels.
8. Show the five images for approval. Treat them as final only after the user approves them. Do not regenerate approved images unless explicitly asked.
9. Keep the main image simple. Do not place screenshots, unrelated source images, or unnecessary promotional blocks on it.
10. After approval, upload all five images to ImgBB and use HTTPS direct image URLs. Use the user's already configured, authorized ImgBB credential through the supported credential configuration. Never hardcode an API key or publish it in the skill. If no credential is configured, request configuration through the supported credential flow. If ImgBB rejects the key or the platform blocks the external upload operation, report the actual blocker instead of claiming the upload completed.
11. Create exactly one material image by center-cropping the first main image to a square. Use at least 800×800; 1340×1340 is preferred. Repeat this same URL in every SKU row.

## Information collection

After image approval, and never before it, ask once for: main product number, men's or women's clothing, colors, sizes, declared price in RMB, and any special inventory, logistics, packaging, origin, or image requirements.

## Color handling

- If the user provides one clothing image, assume it is one color unless the user says otherwise.
- If the user provides multiple images of the same garment and indicates they are the same style in different colors, treat them as one product with multiple color variants.
- For a single-image single-color product, do not ask the user to confirm the color; use the single-color workflow and omit a color code from the SKU.
- For multiple same-style images representing different colors, ask the user to provide the exact color name for each image or variant. Never guess a color from visual appearance, lighting, camera white balance, or image background.
- For a multi-color product, generate a complete five-image set for every color: one main image plus four separate detail images per color. Never make one shared five-image set for all colors, combine colors in one image, reduce the number of images, or lower the quality because there are multiple colors. Apply the same image roles, strict 1340×1785-pixel final dimensions, realism, and per-file dimension checks to every color set.
- Use the user's exact color names for the workbook's color field, but normalize every color component used inside a SKU to its English translation in uppercase letters. For example, the user-provided color `红色` may appear as `红色` in the color field but must appear as `RED` in the SKU. Do not guess or invent a color translation; if the exact color is unclear, ask the user.
- If the user has not identified which color belongs to which image, pause SKU and workbook creation until the mapping is confirmed.

Use this compact prompt:

> 请提供：主货号、男士还是女士、颜色、尺码、申报价格 RMB，以及是否有特殊库存或物流要求。

If the user only gives product number, color, and sizes, continue with the defaults below.

## Fixed defaults

- Inventory: 50 units per size
- Declared price: user's supplied amount in RMB
- Suggested price: declared price × 4/3 in RMB, then convert that result to USD for the USD suggested-price field
- Use the exchange rate available on the day the workbook is prepared; state the rate and converted amount briefly in the final response
- Package size: 27×20×2 cm
- Weight: 220 g
- Shipping time: 2 days
- Custom product: No
- External package shape: 软包装+软物
- External package type: 软包装+软物
- Packaging list column: leave completely blank for every SKU row; never enter packaging text in this column
- Origin: 中国-广东省
- Final image dimensions: exactly 1340×1785 pixels for every image file
- Composition ratio: match the 1340:1785 frame (approximately 3:4); do not use 2:3 as a conflicting final-output requirement

Override a default only when the user gives a product-specific value.

## SKU rules

Use uppercase sizes in SKU values.

- One color: `MAIN-SIZE`, for example `TZ4067-M` and `TZ4067-2XL`.
- Multiple colors: `MAIN-COLOR-SIZE`. Translate the confirmed color name to English and make the entire color component uppercase; examples include `TZ4067-RED-M`, `TZ4067-NAVY-XL`, and `TZ4067-WINE-RED-2XL`. Keep the main product number and size as provided, and use hyphens between components.

Create one workbook row for every color-size combination.

## Titles and copy

Create both Chinese and English titles. Both titles must explicitly identify the garment as men's or women's clothing. Do not use punctuation in titles. Do not invent material, fit, features, or color claims that are not visible or supplied by the user.

Descriptions must contain English only. Write complete natural paragraphs, not keyword lists. Use approximately 25–50 English words between image URLs and mention relevant wear occasions, holidays, gifting, comfort, styling, value, or search terms only when supported by the product.

## Workbook population

Use the supplied Storekeeper/Temu template and preserve its structure.

- Preview image: first main-image URL
- Carousel images: all five URLs in their original order
- Product material image: the single square crop, repeated on every SKU row
- Product description: put the five carousel URLs in reverse order; place one natural English paragraph between each adjacent URL
- Declared price field: supplied RMB amount
- Suggested price field: converted USD amount after applying ×4/3
- Fill SKU, size, color, package size, weight, shipping time, customization, packaging, origin, and inventory for every row
- Leave the template's 包装清单 column blank on every row, even when other packaging fields are filled

Before delivery, verify exactly five carousel URLs, one material URL, one row per SKU, no Chinese in descriptions, and no accidental source screenshots.

## Completion response

Provide the final Excel file, summarize the SKU count, inventory rule, declared RMB price, converted USD suggested price, and any assumptions. Do not claim completion if image approval, ImgBB upload, or workbook export failed.
