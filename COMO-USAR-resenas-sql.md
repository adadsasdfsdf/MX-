# 如何导入 WooCommerce 商品评论（路线1：SQL + phpMyAdmin）

本目录下的 `navidalia-resenas.sql` 会为 Navidalia 商店的 **53 个商品**批量生成真实感的西班牙语买家评论（WooCommerce 的「产品评价 opiniones」），执行后商品页会自动显示星级和评价数量。

> ⚠️ 这些 SQL **只做一次**即可。重复执行会重复插入评论。

---

## 一、执行前：先给数据库做备份（强烈建议）

1. 登录宝塔面板 → 左侧「**数据库**」。
2. 找到 `navidalia` 这个数据库 → 点右侧「**备份**」按钮做一次完整备份。
   - 万一导入出问题，可以从这里「**还原**」回去。

---

## 二、打开 phpMyAdmin（请用 root 账号登录）

1. 在宝塔「数据库」页面，点上方的「**phpMyAdmin**」进入。
2. **用 root 账号登录**：
   - 用户名：`root`
   - 密码：在宝塔「**数据库 → root密码**」里可以看到/修改。
3. 为什么要用 root？
   - 如果用普通用户 `navidalia` 登录，phpMyAdmin 左侧列用户列表时会报错：
     `#1142 - SELECT command denied ... table 'user'`。
   - 这只是「列出用户列表」失败，**不影响导入**，但为了省事直接用 root 最稳。

---

## 三、导入 SQL 文件

1. 在 phpMyAdmin **左侧**点选 `navidalia` 数据库（一定要先选中它，别在最外层执行）。
2. 点上方的「**导入 / Import**」标签。
3. 「要导入的文件」处点「**选择文件**」，选择本目录里的 `navidalia-resenas.sql` 上传。
4. 其它选项保持默认（字符集会由文件开头的 `SET NAMES utf8mb4;` 处理），点最下方「**执行 / Go**」。
5. 如果文件被分成了多个（`navidalia-resenas-parte1.sql`、`-parte2.sql`…），**按顺序 part1 → part2 → …** 逐个导入。
   - 本次只有**一个**文件 `navidalia-resenas.sql`，不需要分批。

> 若文件较大导致上传超时，可在宝塔「软件商店 → PHP 设置」里把 `upload_max_filesize` 和 `post_max_size` 调大（比如 64M），或用 phpMyAdmin 的分批执行。

---

## 四、原理说明（出问题时对照）

- 这些评论是 **WooCommerce 的产品评价**（`comment_type = 'review'`）。导入后：
  - 每条评论带 **1–5 星评分**，大部分标记为「**Compra verificada / 已验证购买**」。
  - SQL 结尾已自动更新每个商品的 **平均分**（`_wc_average_rating`）、**评价数**（`_wc_review_count`）和 **星级分布**（`_wc_rating_count`），所以商品页的星星和「XX opiniones」数量会**自动正确显示**。
- 评论通过商品的 **SKU 自动匹配商品 ID**（不需要你知道商品的数字 ID）。
- **前提条件**：
  1. 必须**先完成 53 个商品的导入**（SKU 已存在于数据库），否则评论会匹配不到商品。
  2. 这些 SQL 使用 WordPress **默认表前缀 `wp_`**。

### 如果执行时报错 "找不到表 wp_xxx"
说明你的 WordPress 表前缀不是默认的 `wp_`（有些安装会用 `wp_abc123_` 这类随机前缀）。
- 解决办法：把你实际的表前缀告诉开发者（在 phpMyAdmin 左侧能看到真实表名，比如 `wpab_posts`），让开发者用正确前缀重新生成即可。

---

## 五、执行后

- 刷新任意商品页面，就能看到底部的「**Opiniones / 评价**」区域出现评论，以及顶部的星级评分。
- 若没立刻显示，清一下 WooCommerce / 站点缓存再刷新。

---

搞定！如需调整评论数量、语气或评分比例，告诉开发者重新生成即可。
