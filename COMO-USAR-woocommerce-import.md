# 如何把 Navidalia 商品导入 WooCommerce

本文件说明如何使用生成好的 `navidalia-woocommerce-productos.csv` 把全部 53 个商品(连同图片)一次性导入 WooCommerce。

## 1. 进入导入工具

在 WordPress 后台,进入 **「商品 Products → 导入 Import」**(这是 WooCommerce 自带的导入工具)。

## 2. 上传 CSV 文件

点击选择文件,上传 **`navidalia-woocommerce-productos.csv`**,然后点下一步。

## 3. 列映射(Column mapping)

列映射基本会**自动匹配**(文件使用的是 WooCommerce 标准列名),直接点 **「运行导入器 / Run the importer」** 即可。

## 4. 图片会自动抓取

导入时 WooCommerce 会**自动从图片 URL 抓取每一张商品图**。

- 图片来自用户原来的 **Vercel Blob**,是**公开可访问**的链接,所以**不用手动一张张上图**。
- 注意:抓图需要你的服务器能**联网访问外部图片**(服务器必须能对外访问这些 URL)。

## 5. 价格说明

- **Regular price = 原价(页面上显示为划线价)**
- **Sale price = 促销价(引流款 5 折、其余 8 折,页面上显示为红色促销价)**

导入后商品会同时显示划线原价 + 促销价。

## 6. 分类会自动创建

导入时会自动创建以下 **7 个分类**:

- Árboles
- Esferas y Adornos
- Luces y Series
- Decoración
- Regalos
- Ropa Navideña
- Dulces

## 7. 导入完成后

导入后,你可以在后台「**商品 Products**」里看到 **53 个商品**。购物车 / 结算流程由 **WooCommerce** 本身提供,无需额外配置。

## 8. 重要提醒:收款需要配置支付网关

真实收款需要**另外配置支付网关**(例如 **Mercado Pago / Stripe**)。

这一步需要**你本人注册商户账号**并在 WooCommerce 中接入,导入 CSV 本身不包含支付配置。
