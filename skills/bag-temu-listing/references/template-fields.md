# Original Storekeeper Temu fields

Prefer bundled `assets/storekeeper_temu_template.xlsx`. Its persistent backup is **店小秘Temu包包导入空白模板.xlsx**, Library ID `libfile_33c41973fd248191bec2cb745644c3df`, file ID `file_000000002ca881faa492b08fbabaf11d`. It is the original 51-column template with product rows cleared and 导入示例 retained. If the bundle is missing, follow the Library skill to materialize this exact known reference rather than guessing a template or scanning old chats. Honor a newer original template supplied by the user. Under another account, prefer the bundle or that account's original template instead of assuming access to this personal backup.

Preserve original 51 headers A–AY and the two sheets 导入模板 and 导入示例. Clear prior product rows only in 导入模板. Keep actual bag dimensions separate from the package dimensions in L–N: add 1 cm to each corresponding actual dimension for packaging, never for image scale.

| Columns | Header or purpose | Fill rule |
| --- | --- | --- |
| A B | Chinese and English title | No punctuation or color words; ≤250 characters each |
| C | 产品描述 | SAME English HTML in all SKU rows; shared carousel image/paragraph pairs in reverse order |
| D | 产品货号 | Product number |
| E F | First variant name/value | 颜色 and the confirmed color; a single clearly visible color can be named without questioning; use 单色 if unresolved |
| G H | Second variant name/value | ALWAYS blank; no size, One Size or 均码 |
| I | 预览图 | As before each SKU's own color clean full-bag MAIN original URL at 1500×1500; preserve approved existing main; never use mixed-carousel details or scenes |
| J | 申报价格 in shop currency | User's declared RMB number |
| K | SKU货号 | Product number alone for single color; number plus uppercase English color for multi-color |
| L M N | 长 宽 高 cm | Actual bag length + 1 cm, width + 1 cm, height + 1 cm; use 25 22 12 only when actual dimensions are not supplied |
| O | 重量 g | 450 |
| P Q | 识别码类型 识别码 | Blank unless supplied |
| R | 站外产品链接 | Blank unless supplied |
| S | 轮播图 | ONE shared set of EXACTLY 10 verified 1500×1500 original URLs in normal order in ALL rows; mixed confirmed colors and different scenes; newline-separated |
| T | 产品素材图 | ONE common approved 1500×1500 shared-carousel main original URL in all SKU rows |
| U V | 外包装形状 外包装类型 | 软包装+软物 in both, matching tested template |
| W | 外包装图片 | Blank unless supplied |
| X | 建议售价 USD | RMB ×4/3 ÷ current CNY-per-USD, rounded to two decimals |
| Y | 库存 | 50 unless overridden |
| Z | 发货时效 天 | 9 for EVERY bag SKU |
| AA | 是否定制品 | 否 |
| AB AC | Product/description video | Blank unless supplied |
| AD AE | Manual/language | Blank unless supplied |
| AF | SKU分类类型 | 单品 |
| AG | SKU分类数量 | Blank unless explicitly needed |
| AH | SKU分类单位 | 件 |
| AI AJ AK | 独立包装 单品净含量 单位 | Blank unless supplied |
| AL | 内计共含件数 | 1 for one bag |
| AM AN AO | 同品 总净含量 单位 | Blank unless supplied |
| AP AQ | 包装清单 包装清单数量 | ALWAYS blank |
| AR | 是否敏感属性 | 否 for an ordinary bag |
| AS AT AU AV AW | Sensitive attribute fields | Blank for an ordinary bag |
| AX | 来源URL | Blank unless supplied |
| AY | 产地 | 中国-广东省 |

E/F satisfy the original mandatory variant fields even with one SKU. Never add a size to satisfy them. Single color does not add a color segment to SKU. Use explicit user instructions when they override ordinary defaults.
