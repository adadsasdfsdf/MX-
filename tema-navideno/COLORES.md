# 🎨 Paleta de colores Navidalia · Astra 配色指南

主色为**圣诞红**,搭配**金色**与**绿色**点缀。下面是全部色号,以及在 Astra 自定义器里**具体填到哪里**。

## 色号表(复制 HEX)

| 名称 (Nombre) | 用途 (Uso) | HEX |
|---|---|---|
| Rojo Navidad (圣诞红 · 主色) | 主色 / Primary · 按钮 · 链接 | `#C1121F` |
| Rojo oscuro (深红) | 页眉背景 · 悬停 · 强调 | `#780000` |
| Dorado (金色 · 点缀) | 次强调 / Accent · 价格 · 图标 | `#D4AF37` |
| Verde (绿色 · 点缀) | 次强调 2 · 徽章 · 库存提示 | `#2E7D32` |
| Crema / 米白 (背景) | 页面背景 / Base background | `#FDF6EC` |
| Casi negro (正文文字) | 正文 / Text | `#1A1A1A` |
| Blanco (白) | 红底上的文字 | `#FFFFFF` |

---

## 在 Astra 里怎么填(重点)

路径:**外观 → 自定义 → 全局 → 颜色**(`Apariencia → Personalizar → Global → Colores`)。

Astra 的「全局调色板 / Global Palette」有若干颜色槽(Color 1 ~ Color 7)。按下表填:

| Astra 颜色槽 | 填入 HEX | 说明 |
|---|---|---|
| **Color 1 — Primary Theme Color(主题主色)** | `#C1121F` | 链接、强调、主要高亮 |
| **Color 2 — Secondary Theme Color(主题次色)** | `#780000` | 悬停态、深色强调 |
| **Color 3 — Heading / Text Color(标题文字)** | `#1A1A1A` | 大标题 |
| **Color 4 — Body / Text Color(正文文字)** | `#1A1A1A` | 正文(也可用 `#2A2A2A`) |
| **Color 5 — Base / Background(基础背景)** | `#FDF6EC` | 页面米白底色 |
| **Color 6 — Light Background(浅背景)** | `#FFFFFF` | 卡片 / 区块白底 |
| **Color 7 — Accent(点缀金色)** | `#D4AF37` | 价格、图标、次强调 |

> 💡 Astra 不同版本颜色槽的名字略有差别(有的是「Color 1/2/3…」,有的直接写 Primary/Secondary/Text/Accent)。只要把**主色填红 `#C1121F`、强调填金 `#D4AF37`、背景填米白 `#FDF6EC`、文字填近黑 `#1A1A1A`** 即可。绿色 `#2E7D32` 作为额外点缀,可用在徽章或自定义 CSS。

---

## 按钮颜色(Botones)

路径:**外观 → 自定义 → 全局 → 按钮(Botones / Buttons)**

| 项目 | 填入 HEX |
|---|---|
| 文字颜色 Text Color | `#FFFFFF` |
| 背景色 Background Color | `#C1121F` |
| 悬停文字 Hover Text | `#FFFFFF` |
| 悬停背景 Hover Background | `#780000` |
| 圆角 Border Radius | `30px`(胶囊按钮,配合横幅风格)|

---

## 页眉 / 页脚(Encabezado / Pie)

- **页眉背景**建议用红 `#C1121F` 或深红 `#780000`。
  - ⚠️ 如果页眉用红底,**logo 请用白色版** `logo-navidalia-blanco.svg`;菜单文字设为白 `#FFFFFF`,悬停金 `#D4AF37`。
- **页眉用白底**时,用普通版 `logo-navidalia.svg`。
- **页脚**可用深红 `#780000`,文字米白 `#FDF6EC`。

---

## WooCommerce 价格 / 促销色(可选 · 自定义 CSS)

路径:**外观 → 自定义 → 附加 CSS(CSS adicional)**,粘贴:

```css
.woocommerce ul.products li.product .price,
.woocommerce div.product p.price { color: #2E7D32; font-weight: 700; }
.woocommerce span.onsale { background:#D4AF37 !important; color:#1A1A1A !important; }
```
