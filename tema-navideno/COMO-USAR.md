# 🎄 Navidalia 圣诞素材包 · 导入使用指南(Astra + WooCommerce)

本素材包是**可直接导入**的资源:logo、favicon、图标、圣诞横幅、配色参考、首页区块模板。
不是 PHP 主题,你已经装好并启用了 **Astra** 主题,这里只是把素材放进去。

> ⚠️ 关于格式:本包所有图片均为 **SVG 矢量图**(清晰、可无限缩放、文件小)。
> **没有附带 PNG**,因为当前打包环境**没有可用的 SVG→PNG 转换工具**(无法联网安装)。
> SVG 完全可以用,只是 WordPress 默认出于安全**不允许直接上传 SVG**,下面第 1 步给出两条解决办法。

---

## 📁 文件清单与用途

| 文件 | 用途 |
|---|---|
| `logo-navidalia.svg` | **站点 logo(浅色/白底页眉用)** · 深色文字 |
| `logo-navidalia-blanco.svg` | **站点 logo(红底/深色页眉用)** · 米白+金色文字 |
| `favicon.svg` | **站点图标 / favicon**,32×32 也清晰(红底驯鹿头) |
| `reno-icon.svg` | 驯鹿🦌装饰图标(正方形),可用于分区、按钮旁 |
| `arbol-icon.svg` | 圣诞树🎄装饰图标(正方形) |
| `hero-banner.svg` | **首页横幅(无文字版)**,1600×600,用作 cover 背景、再叠加文字 |
| `hero-banner-con-texto.svg` | **首页横幅(已内置西语文案版)**,直接当图片插入即可 |
| `COLORES.md` | 配色色号 + Astra 填色位置说明 |
| `pagina-inicio.html` | **首页区块模板**(Gutenberg 代码,粘贴即用) |
| `COMO-USAR.md` | 本说明 |

---

## 第 1 步 · 上传 logo 和 favicon

### 1.1 让 WordPress 能上传 SVG(二选一)

- **方法 A(推荐):装「Safe SVG」插件**
  插件 → 安装插件 → 搜索 **Safe SVG** → 安装 → 启用。
  之后就能在媒体库正常上传 `.svg` 文件了。
- **方法 B:** 如果你不想装插件,可以用任意在线/本地工具把 SVG 转成 PNG 再上传
  (例如用浏览器打开 SVG 截图,或用设计软件导出 512×512 PNG)。本包**未附带 PNG**。

### 1.2 上传并设置 logo

路径:**外观 → 自定义 → 页眉(Encabezado / Header)→ 站点标识 / Logo**

- 页眉若是**白/浅色**底:上传 `logo-navidalia.svg`。
- 页眉若是**红/深色**底:上传 `logo-navidalia-blanco.svg`(白+金文字,红底上也看得清)。
- logo 宽度建议 180–220px。

### 1.3 设置 favicon(站点图标)

同一界面里找 **站点图标 / Icono del sitio(Site Icon)** → 上传 `favicon.svg`。
(若 Astra/WordPress 要求站点图标必须是 PNG 且 ≥512×512,请按 1.1 方法 B 先转成 PNG。)

---

## 第 2 步 · 设置配色

打开 `COLORES.md`,按里面的表格操作:
**外观 → 自定义 → 全局 → 颜色(Global → Colores)**,把主色填红 `#C1121F`、点缀金 `#D4AF37`、
背景米白 `#FDF6EC`、文字近黑 `#1A1A1A`;按钮按 `COLORES.md` 的「按钮」小节填。

---

## 第 3 步 · 建首页(粘贴区块模板)

1. **页面 → 新建页面(Añadir página)**,标题填 `Inicio`。
2. 点右上角 **⋮(选项菜单)→ 代码编辑器(Editor de código / Code editor)**。
3. 打开 `pagina-inicio.html`,**全选复制**里面的全部内容,**粘贴**进代码编辑器。
4. 再点 **⋮ → 可视化编辑器(Visual editor)** 切回,确认区块正常显示。
5. 点 **发布(Publicar)**。

### 3.1 设成网站主页

**设置 → 阅读(Ajustes → Lectura)→ 主页显示** 选「**静态页面**」→ 主页选 **Inicio**。
这样打开网站首页就是圣诞首页,而不是默认的「世界,您好」博客。

---

## 第 4 步 · 把横幅和链接接上

### 4.1 「Ver tienda」按钮指向商店

模板里所有购物相关按钮链接目前都是占位符 `#tienda`。
在页面(可视化编辑器)里点中按钮 → 改链接为你的商店页地址,
通常是 `/tienda` 或 `/shop`(WooCommerce 商店页)。「Ir a la tienda」按钮同样处理。

### 4.2 换上圣诞横幅图

- **做法一(推荐,文字可编辑):** 首页顶部的 cover 区块现在是**纯红底**。
  选中 cover → 在区块设置里把**背景**换成上传后的 `hero-banner.svg`(先按第 1 步上传到媒体库)。
  文字(标题「La magia de la Navidad, a tu puerta」+ 按钮)会叠在图片上,可随时改。
- **做法二(最省事):** 直接在首页插入一个 **图片区块**,选 `hero-banner-con-texto.svg`。
  这张图**已经内置西语文案和「Ver tienda」样式按钮**(图里按钮只是装饰,真正可点的按钮用做法一或在图下方加一个按钮区块)。

---

## 第 5 步 · 导航菜单

**外观 → 菜单(Menús)**:新建一个菜单,勾选加入:
- **Inicio**(首页)
- **商店 / Tienda**(WooCommerce 商店页)
- **各分类**:Árboles、Esferas y Adornos、Luces y Series、Decoración、Regalos、Ropa Navideña、Dulces
- **购物车 / Carrito**、(可选)**Mi cuenta**

把菜单指定到 Astra 的「**主菜单 / Primary Menu**」位置,保存。

---

## 第 6 步 · 关闭「即将推出 / Coming Soon」模式

如果访客现在看到的是「即将上线」页面,说明开着「即将推出」模式,需要关掉:

- 如果你装了 **SeedProd / Coming Soon / Maintenance** 这类插件:进该插件设置,把模式切到 **Inactivo / Off(停用)**。
- 如果用的是 **WooCommerce / 主机面板** 的维护开关:找到对应的「**即将推出 / Coming soon / Mantenimiento**」开关关掉。
- 找不到的话:**插件** 列表里搜 “coming / maintenance / soon”,逐个检查其设置里的开关。

关闭后用**无痕窗口**打开网站确认访客能正常看到首页。

---

## 💡 小贴士

- 所有图片是 **SVG 矢量图**:放大不糊、文件小、适合高清屏。
- 顾客可见文案全部是**西班牙语(español mexicano)**;本说明是中文。
- `reno-icon.svg` / `arbol-icon.svg` 可作装饰:插到标题旁、分区之间,或在「附加 CSS」里当背景图。
- 想改横幅文字颜色/位置:直接编辑 `hero-banner-con-texto.svg` 里的 `<text>` 标签即可。
