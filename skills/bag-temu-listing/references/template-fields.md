# Original Storekeeper Temu fields

Prefer bundled `assets/storekeeper_temu_template.xlsx`. It is the original 51-column template with product rows cleared and 导入示例 retained. If the bundle is missing, ask the user for their original 51-column template rather than guessing a template or scanning old chats. Honor a newer original template supplied by the user. Under another account, prefer the bundle or that account's original template instead of assuming access to this personal backup.

Preserve original 51 headers A–AY and the two sheets 导入模板 and 导入示例. Clear prior product rows only in 导入模板. Keep actual bag dimensions separate from fixed shipping fields L–N.

| Columns | Header or purpose | Fill rule |
| --- | --- | --- |
| A B | Chinese and English title | No punctuation or color words; ≤250 characters each |
| C | 产品描述 | English HTML; ALL image/paragraph pairs in reverse carousel order |
| D | 产品货号 | Product number |
| E F | First variant name/value | 颜色 and the confirmed color; a single clearly visible color can be named without questioning; use 单色 if unresolved |
| G H | Second variant name/value | ALWAYS blank; no size, One Size or 均码 |
| I | 预览图 | Current color main URL |
| J | 申报价格 in shop currency | User's declared RMB number |
| K | SKU货号 | Product number alone for single color; number plus uppercase English color for multi-color |
| L M N | 长 宽 高 cm | 25 22 12 |
| O | 重量 g | 450 |
| P Q | 识别码类型 识别码 | Blank unless supplied |
| R | 站外产品链接 | Blank unless supplied |
| S | 轮播图 | ALL 5–12 URLs normal order; main first; newline-separated |
| T | 产品素材图 | ONE common first-color main URL in all SKU rows |
| U V | 外包装形状 外包装类型 | 软包装+软物 in both, matching tested template |
| W | 外包装图片 | Blank unless supplied |
| X | 建议售价 USD | RMB ×4/3 ÷ current CNY-per-USD, rounded to two decimals |
| Y Z | 库存 发货时效 | 50 and 2 unless overridden |
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
