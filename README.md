# Atelier Table

一个面向个人周末学习的西餐 Web App。当前版本已经接入第 1 周“香煎脆皮鸡腿排套餐”的真实课程和菜谱数据。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址，通常为 `http://localhost:5173`。

## 当前页面

- `/`：首页与当前课程。
- `/learn`：8 周学习计划。
- `/learn/week/1`：第 1 周课程详情。
- `/recipes`：菜谱库、搜索与分类筛选。
- `/recipes/crispy-chicken-thigh-set`：第 1 周完整菜谱。

## 已实现行为

- 课程状态保存在浏览器本地。
- 菜谱的 8 个制作阶段可以逐项勾选，刷新后保留。
- 菜谱库支持按名称或技法搜索，并包含空结果状态。
- 桌面端使用侧边导航，移动端使用底部导航。
- 第 2～8 周显示课程骨架和“内容准备中”状态。

## 数据来源

- `data/course-weeks/week-01.json`：第 1 周课程数据。
- `data/recipes/crispy-chicken-thigh-set.json`：完整菜谱数据。
- `assets/images/week-01-crispy-chicken-cover.jpg`：Web App 使用的优化封面图。
- `assets/images/week-01-crispy-chicken-cover.png`：保留的高质量原图。

## 检查命令

```bash
npm run typecheck
npm run build
```
