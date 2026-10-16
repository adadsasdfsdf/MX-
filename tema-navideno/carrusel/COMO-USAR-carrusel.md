# 🎠 使用指南 · Hero 轮播 + 顶部绿色促销条(Navidalia)

本文件夹为你的 WordPress 新站(Astra 主题 + WooCommerce + Smart Slider 3 插件)提供一套「首页顶部」素材,用来**复刻你原来 Vercel 站的样子**:

- 顶部一条**绿色滚动促销条**(799 包邮、全场 8 折、分期付款等);
- 下面一个**全宽自动轮播 Hero**(5 张,底部圆点 + 左右箭头);
- 背景使用**你之前那套素材包**同款圣诞插画风格(红色天空、雪地、驯鹿、圣诞树、礼物、串灯),不用圣诞树照片。

> ⚠️ 我无法登录你的服务器,所以**幻灯片需要你自己在 Smart Slider 3 的后台界面里拼装**。下面是逐步操作。

---

## 📦 文件清单(本文件夹内)

| 文件 | 用途 |
|---|---|
| `slide-1-bg.svg` | 第 1 张背景(50% 折扣,复刻原版) |
| `slide-2-bg.svg` | 第 2 张背景(全国包邮) |
| `slide-3-bg.svg` | 第 3 张背景(盛大开业 20%) |
| `slide-4-bg.svg` | 第 4 张背景(分类/圣诞树) |
| `slide-5-bg.svg` | 第 5 张背景(夜景/分期付款 · 信任) |
| `TEXTOS-SLIDES.md` | 5 张幻灯片的**西语文案**(标题/副标题/按钮),复制粘贴用 |
| `barra-promo.html` | 顶部**绿色滚动促销条**(纯 CSS,直接粘贴) |
| `COMO-USAR-carrusel.md` | 本说明文件 |

---

## 第一步:先解决 SVG 上传(重要)

这 5 张背景是 **SVG 矢量图**(清晰、文件小)。WordPress 默认**不允许**上传 SVG。两种办法二选一:

- **办法 A(推荐):启用 Safe SVG 插件**(你之前装过)。
  路径:`插件 → 已安装的插件 → 启用 Safe SVG`。之后就能在媒体库正常上传这些 `.svg`。
- **办法 B:转成 PNG**。如果不想开 SVG 支持,可以用任意「SVG 转 PNG」工具把每张导出成 **1600×600 PNG**(或 1920×720 更清晰),再上传。效果一样,只是文件大一点。

> 💡 Smart Slider 3 本身支持 SVG 背景,瓶颈只在 WordPress 的上传过滤。开了 Safe SVG 就没问题。

---

## 第二步:新建 Slider

1. 后台左侧菜单打开 **Smart Slider**(或 `Smart Slider 3`)。
2. 点 **New Project(新建项目)→ Create a New Slider(新建 Slider)**。
3. 填写:
   - **Name(名称):** `Hero Navidalia`
   - **Slider type:** `Simple slider`(简单轮播)
   - **Layout / Size(尺寸):** 选 **Full width(全宽)**;
     - **Width:** 1600(或留默认,全宽会自适应);
     - **Height:** **500**(px)。想更高可用 600。
4. 点 **Create(创建)**。

---

## 第三步:逐张添加 5 张幻灯片

对**每一张**(1→5)重复下面动作:

1. 在 Slider 编辑器里点 **Add Slide(添加幻灯片)**。
   - 选 **Image(图片)**:直接上传对应的 `slide-N-bg.svg`,它会自动成为该张的**背景**;
   - 或选 **Blank(空白)**,再到右侧 **Slide 面板 → Background(背景)→ Background Image** 里选上传好的 `slide-N-bg.svg`。
2. 背景填充方式建议:**Background Fill = Fill**(铺满),**Background Position = Center**(居中),这样全宽下不留白。
3. 对应关系(别放错):
   - 第 1 张 → `slide-1-bg.svg`
   - 第 2 张 → `slide-2-bg.svg`
   - 第 3 张 → `slide-3-bg.svg`
   - 第 4 张 → `slide-4-bg.svg`
   - 第 5 张 → `slide-5-bg.svg`

> 这些背景图**本身不含文字**,左侧留有一条暗色渐变带,专门让白色文字清晰可读。文字我们在下一步用「文字图层」加上去。

---

## 第四步:给每张加文字图层和按钮图层

打开 `TEXTOS-SLIDES.md`,按张把西语文案贴进去。进入某一张的编辑界面后:

### 1) 小标题 / Kicker(眼眉文字)
- 点 **Add Layer(添加图层)→ Heading** 或 **Text**。
- 粘贴该张的 **Kicker**(例如 `🔥 Ofertas de temporada`)。
- 字号小一些(16–18px),颜色 **金色 `#D4AF37`** 或白色,放在左侧暗带的上方。

### 2) 大标题 / Heading
- **Add Layer → Heading**。
- 粘贴该张的 **Encabezado(H1)**。
- 字号大(例如 44–56px,移动端自动缩小),**加粗**,颜色 **白色 `#FFFFFF`**(第 3 张用米白 `#FDF6EC`)。

### 3) 副标题 / Subtexto
- **Add Layer → Text**。
- 粘贴该张的 **Subtexto**。
- 字号 18–22px,颜色白色,放在大标题下方。

### 4) 按钮 / Button
- **Add Layer → Button**。
- 文案用该张的 **Botón** 文字(例如 `Ver ofertas`)。
- 样式:**背景色填红 `#C1121F`**,**文字白色**,圆角 `30px`(胶囊按钮,和你的 Astra 按钮风格一致)。
- **链接(Link):** 先填占位 `http://TU-DOMINIO/tienda/`(商店)或 `http://TU-DOMINIO/ofertas/`(促销页)。
  👉 **记得之后替换成你真实的商店/促销页网址!**
- 第 1 张有**两个按钮**:第二个按钮 `Ver categorías` 用**白色描边、透明底**(outline)做次要按钮,链接到商店/分类页。

> 📐 排版建议:把这些图层都放在幻灯片**左半边**(背景左侧有暗带),文字才清晰。可以用 Smart Slider 的内容对齐工具靠左。

---

## 第五步:打开自动播放、圆点和箭头(还原原版 Hero)

在 Slider 编辑器里,点右上 **Settings / Slider Settings(滑块设置)**:

1. **Autoplay(自动播放):** 打开 `ON`。
   - **Interval / Duration(切换间隔):** `5000` ms(5 秒)。
   - **Pause on hover(悬停暂停):** 建议 `ON`。
2. **Animation / Main animation(过渡效果):** 选 `Fade(淡入淡出)` 或 `Horizontal / Slide(横向滑动)`,还原原版那种平滑切换。
3. **Controls(控件):**
   - **Bullets(底部圆点):** 打开 `ON` —— 这就是原版 Hero 底部那排小圆点。
   - **Arrows(左右箭头):** 打开 `ON`。
   - 颜色可以设成白色/金色,和圣诞配色一致。
4. 点 **Save(保存)**。

---

## 第六步:把 Slider 放到首页,并在上方加绿色促销条

Smart Slider 会给你一段**短代码**,形如:

```
[smartslider3 slider="1"]
```

(`slider="1"` 里的数字是你这个 slider 的 ID,以实际为准。)

然后编辑**首页(Inicio)**页面:

1. 后台 **页面(Páginas)→ 打开「Inicio / 首页」→ 编辑**。
2. 找到现在那个**红色 cover 大横幅区块**(原来的静态 Hero),把它**删除**。
3. 在原位置插入一个 **「短代码 / Shortcode」区块**,粘贴上面的 `[smartslider3 slider="X"]`。
4. 在这个短代码区块的**正上方**,再插入一个 **「自定义 HTML / Custom HTML」区块**,把 `barra-promo.html` 里的**全部内容**粘进去 —— 这就是顶部那条绿色滚动促销条。
   - 顺序从上到下应为:**绿色促销条(HTML 区块)→ Hero 轮播(短代码区块)→ 下面的其它内容**。
5. 点 **更新(Actualizar / Update)**,前台刷新首页查看效果。

> 🧩 如果你想让绿色促销条出现在**全站所有页面**的最顶部(而不仅首页),可以改用 Astra 的「页眉上方区域 / Above Header」或一个全站的 HTML 小工具(Widget)来放 `barra-promo.html`。但最简单稳妥的做法就是先放在首页。

---

## 💡 小贴士

- **先跑通再补全:** 如果一次做 5 张觉得繁琐,可以**先做第 1–2 张**(甚至只做第 1 张)跑通整条流程(背景 + 文字 + 按钮 + 自动播放 + 圆点),确认首页显示正常后,再回来补第 3–5 张。
- **按钮链接别忘了换:** 文案里的 `http://TU-DOMINIO/...` 都是占位符,上线前请替换成你真实的商店/促销/分类页网址。
- **颜色一致性:** 文字白 `#FFFFFF`、按钮红 `#C1121F`、点缀金 `#D4AF37`、促销条绿 `#2E7D32` —— 和你的 Astra 配色指南(`COLORES.md`)完全一致。
- **移动端检查:** 全宽 Hero 在手机上标题会很大,记得在 Smart Slider 的每个文字图层里设置移动端字号(Device-specific font size),避免溢出。

祝布置顺利!🎄🦌
