import { BookOpen, Clock3, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { ActionLink, PageHeader, Tag } from "../components/ui";
import { crispyChickenRecipe, recipeCategories } from "../lib/data";

export function RecipeLibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const recipeVisible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      crispyChickenRecipe.name.toLowerCase().includes(normalizedQuery) ||
      crispyChickenRecipe.techniqueTags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery),
      );
    const matchesCategory =
      category === "all" || crispyChickenRecipe.category === category;
    return matchesQuery && matchesCategory;
  }, [category, query]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="RECIPE LIBRARY"
        title="把学过的菜，留在手边。"
        description="按菜品或技法查找完整制作方法。课程负责顺序，菜谱负责每一次实际下厨。"
      />

      <section className="library-tools" aria-label="搜索和筛选菜谱">
        <label className="search-field">
          <span className="sr-only">搜索菜谱或技法</span>
          <Search aria-hidden="true" size={19} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索菜名或技法，例如“鸡皮脆化”"
          />
        </label>
        <div className="filter-label">
          <SlidersHorizontal aria-hidden="true" size={18} />分类
        </div>
        <div className="filter-chips" aria-label="菜谱分类">
          {recipeCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "is-selected" : ""}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.name}
              <span>{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="results-line" role="status" aria-live="polite">
        <span>{recipeVisible ? "找到 1 道菜谱" : "没有匹配的菜谱"}</span>
        <span>当前内容 · 第 1 周</span>
      </div>

      {recipeVisible ? (
        <section className="recipe-grid" aria-label="菜谱结果">
          <article className="recipe-card">
            <div className="recipe-card-image">
              <img src={crispyChickenRecipe.coverImage} alt="香煎脆皮鸡腿排成品" />
              <Tag tone="warm">已完成内容</Tag>
            </div>
            <div className="recipe-card-content">
              <p className="eyebrow">主菜 · 鸡肉</p>
              <h2>{crispyChickenRecipe.name}</h2>
              <p>{crispyChickenRecipe.subtitle}</p>
              <div className="recipe-card-meta">
                <span>
                  <Clock3 aria-hidden="true" size={16} />
                  {crispyChickenRecipe.estimatedMinutes} 分钟
                </span>
                <span>
                  <BookOpen aria-hidden="true" size={16} />
                  {crispyChickenRecipe.steps.length} 个阶段
                </span>
              </div>
              <div className="tag-list">
                {crispyChickenRecipe.techniqueTags.slice(0, 3).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <ActionLink to={`/recipes/${crispyChickenRecipe.id}`} variant="secondary">
                查看完整菜谱
              </ActionLink>
            </div>
          </article>

          <article className="coming-soon-card" aria-label="更多课程内容准备中">
            <span aria-hidden="true">
              <Sparkles size={24} />
            </span>
            <p className="eyebrow">LIBRARY GROWS WITH YOU</p>
            <h2>每完成一周，这里就多一道真正学会的菜。</h2>
            <p>第 2 周将补充鱼类熟度与快速锅汁。</p>
          </article>
        </section>
      ) : (
        <section className="empty-state">
          <Search aria-hidden="true" size={25} />
          <h2>暂时没有匹配内容</h2>
          <p>试试搜索“鸡腿”“土豆泥”或“鸡皮脆化”。</p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            清除筛选
          </button>
        </section>
      )}
    </div>
  );
}
