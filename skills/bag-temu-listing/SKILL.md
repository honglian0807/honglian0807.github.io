---
name: bag-temu-listing
description: Prepare handbags backpacks and other bags for Temu and Storekeeper import. Use when users supply bag photos or request bag listing images titles SKUs or Excel files. Confirm actual bag dimensions and multiple carrying styles before generating 5 to 12 independent 1500 by 1500 images per color then fill the original Storekeeper template without size variants and with reverse ordered description images.
---

# Bag Temu Listing

Apply this bag-specific workflow independently of Clothing Temu Listing. Do not copy clothing dimensions, weights, size variants or the fixed five-image limit.

## 1 Confirm dimensions and carrying styles BEFORE generating

Inspect supplied photos. Do not generate images until the user confirms BOTH inputs:

- Actual bag width × height × depth in **cm**. Read a supplied dimensioned photo and show the interpreted values for confirmation. Reuse dimensions already confirmed in the conversation.
- Actual supported carrying styles, presented as a **multiple-selection** list: 手提、小臂挂、单肩背、斜挎、双肩背、其他. Accept several selected names or numbers. Never force a single-choice control. Use a multi-select UI if available, otherwise a numbered checklist.

Example intake:

> 请确认包包实际尺寸 宽×高×厚 单位cm
> 请选择实际支持的背法 可多选
> 1 手提 2 小臂挂 3 单肩背 4 斜挎 5 双肩背 6 其他

Inspect strap count, length, handles, metal connectors and attachment points. Depict only confirmed, physically supported uses. A decorative chain is not automatically a load-bearing handle. Ask about a concrete mismatch instead of inventing handles, conversion hardware, long straps or compartments.

Treat one color's photo as **single color**, without unnecessarily asking its color name. Several angles or dimension photos of the same color do not create variants. For multi-color products, confirm the user's color names and image-to-color mapping; do not guess. Ask in the same intake if needed. Keep each color's image set independent.

Do not ask for inventory, shipping defaults, package dimensions, weight, size or unnecessary material information. Product number and price belong after image approval unless volunteered. Omit unverified material claims instead of making material a mandatory question.

## 2 Generate and verify the complete image sets

Use the imagegen skill and built-in tool. Generate **5–12 separate images PER COLOR**, choosing the count based on carrying styles and useful features; never reduce quality for additional colors.

Plan one clean main image, a useful supported alternative angle, details emphasizing attractive **hardware, locks, zippers, chain connections, pockets or strap design**, and a separate real-use scene for EACH confirmed carrying style. Show the bag actually worn or carried with the real strap arrangement. Putting a bag beside a model does not demonstrate a carrying style. Add useful details/scenes to reach five, without repetitive filler; at most twelve per color.

Lock color, bag-body proportions, flap/pocket dimensions, stitching, closure positions, chain length, metal tone and strap construction across the set. Use the actual dimensions to preserve width-to-height and depth; maintain realistic adult human scale. A 21 cm wide × 20 cm high × 12 cm deep mini backpack remains compact and nearly square, not a tall full-sized daypack.

Never use fixed shipping package dimensions as the bag's actual dimensions. Do not invent rear or internal features absent from references. Avoid unrequested props, branding, promotional text, watermarks, panels, collages or added accessories. Use sharp realistic commercial photography. Regenerate structural, scale or anatomy errors before requesting image approval.

Every final image must be **exactly 1500×1500 pixels**, square, independent and individually downloadable. Inspect actual file dimensions, not just previews. Mechanically normalize other tool output sizes without stretching the bag or clipping it, then verify again; `scripts/prepare_images.py` handles this with ImageMagick. It does not replace imagegen or imply native generation at 1500 pixels. Present the verified final files.

Show the complete set for every color, then ask only whether the images need changes. Do not upload or finalize before image approval.

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

Retain all approved image URLs and verify they are accessible. Never upload unapproved drafts or unrelated local files. Reuse links only when they belong to the same approved image bytes.

Use the bundled **original 51-column Storekeeper Temu template** at `assets/storekeeper_temu_template.xlsx`. If it is unavailable, fetch the saved original using [references/template-fields.md](references/template-fields.md). Preserve 导入模板, 导入示例, headers, column order and formatting. Do not substitute a generic product list. The structure was used for BFR8118 and checked; do not claim platform import success unless the user actually reports it.

| Default | Value |
| --- | --- |
| Shipping package length × width × height | **25×22×12 cm** |
| Shipping weight | **450 g** |
| Stock per color SKU | **50**, do not ask again |
| Dispatch time | **2 days** |
| Origin | **中国-广东省** |
| Custom product | 否 |
| Outer package shape and type | Tested template value **软包装+软物** in both fields |
| Packaging list and list quantity | **Blank** |
| Size attribute columns | **Blank** |

Honor explicit user overrides. Declared price is the user's RMB number. Suggested USD price is `declared_RMB × 4 / 3 ÷ CNY_per_USD`, rounded to two decimals. Obtain a current sourced exchange rate and communicate it; never fill RMB in the USD field or silently invent a rate. Write numeric values as numbers.

Generate Chinese and English titles without **any punctuation**, apostrophes or color words. Use `Womens`, `Mens` or `Unisex` as appropriate without inventing gender or age categories. Aim for 230–250 English characters, never exceed 250; Chinese ≤250 characters. Do not invent material, waterproofing, capacity, device compatibility or adjustable/detachable straps.

For each color's row:

- Preview: that color's approved main image.
- Carousel: **ALL 5–12** approved images in normal order, main first, newline-separated HTTPS direct URLs.
- Product material image: **one** common product main-image URL across SKU rows, using the approved first-color main. Already 1500×1500: no extra square crop, screenshots or detail-image substitutes.
- Product description: **English only**, include ALL that row's carousel images in **REVERSE order**, last image first and main image last. Pair each photo with its own relevant 25–50 word paragraph and reverse the pairs together. Never reverse the carousel or keep only five images from a larger set.

Use the Spreadsheets skill and Artifact Tool. `scripts/build_workbook.mjs` fills the original template and enforces these fields. Verify exported cells, URLs, counts/order, absence of size attributes, title punctuation, dimensions, weight and unique SKUs. Preserve the example sheet. Save the final workbook to Library; corrections replace its existing identity/version.

Return only the final Excel unless a ZIP is requested. Report failures honestly. A successful export does not establish that a platform import was tested. Resolve actual import errors against the same original template and the user's error message.
