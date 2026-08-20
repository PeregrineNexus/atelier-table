import courseWeekJson from "../../data/course-weeks/week-01.json";
import recipeJson from "../../data/recipes/crispy-chicken-thigh-set.json";
import coverImage from "../../assets/images/week-01-crispy-chicken-cover.jpg";
import platingCrescentImage from "../../assets/images/week-01-plating-crescent.jpg";
import platingLinearImage from "../../assets/images/week-01-plating-linear.jpg";
import platingSlicedImage from "../../assets/images/week-01-plating-sliced.jpg";
import type { CoursePreview, CourseWeek, Recipe } from "../types";

export const weekOne = courseWeekJson as CourseWeek;

const platingImages: Record<string, string> = {
  "classic-split": coverImage,
  "sliced-fan": platingSlicedImage,
  "modern-linear": platingLinearImage,
  "organic-crescent": platingCrescentImage,
};

export const crispyChickenRecipe = {
  ...recipeJson,
  coverImage,
  inspirationImages: recipeJson.inspirationImages.map((idea) => ({
    ...idea,
    image: platingImages[idea.id],
  })),
} as Recipe;

export const coursePlan: CoursePreview[] = [
  {
    weekNumber: 1,
    title: "香煎脆皮鸡腿排套餐",
    focus: "鸡皮脆化 · 火候控制 · 基础摆盘",
    duration: "2～2.5 小时",
    status: "not_started",
    recipeId: crispyChickenRecipe.id,
  },
  {
    weekNumber: 2,
    title: "鱼类熟度与快速锅汁",
    focus: "鱼皮处理 · 酸度平衡 · 浅色摆盘",
    duration: "约 2 小时",
    status: "coming_soon",
  },
  {
    weekNumber: 3,
    title: "牛排与深色肉汁",
    focus: "熟度判断 · 静置 · 切片方向",
    duration: "2～2.5 小时",
    status: "coming_soon",
  },
  {
    weekNumber: 4,
    title: "意面与乳化",
    focus: "面条熟度 · 酱汁挂面 · 立体摆盘",
    duration: "约 2 小时",
    status: "coming_soon",
  },
  {
    weekNumber: 5,
    title: "烩饭与质地控制",
    focus: "米芯 · 分次加液 · 流动感",
    duration: "约 2 小时",
    status: "coming_soon",
  },
  {
    weekNumber: 6,
    title: "禽肉进阶与果味酱汁",
    focus: "脂肪处理 · 甜酸平衡 · 高度差",
    duration: "2～2.5 小时",
    status: "coming_soon",
  },
  {
    weekNumber: 7,
    title: "海鲜组合与精细配菜",
    focus: "出锅时序 · 小元素组织",
    duration: "2～3 小时",
    status: "coming_soon",
  },
  {
    weekNumber: 8,
    title: "综合结业餐盘",
    focus: "独立时间线 · 完整风味 · 最终摆盘",
    duration: "约 3 小时",
    status: "coming_soon",
  },
];

export const recipeCategories = [
  { id: "all", name: "全部", count: 1 },
  { id: "main-chicken", name: "鸡肉", count: 1 },
  { id: "main-beef", name: "牛排", count: 0 },
  { id: "main-fish", name: "鱼类", count: 0 },
  { id: "italian", name: "意大利菜", count: 0 },
  { id: "french", name: "法式料理", count: 0 },
];
