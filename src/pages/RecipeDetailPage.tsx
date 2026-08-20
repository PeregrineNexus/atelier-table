import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChefHat,
  Clock3,
  CookingPot,
  Flame,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Thermometer,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressBar, SectionHeading, Tag } from "../components/ui";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { crispyChickenRecipe as recipe } from "../lib/data";

export function RecipeDetailPage() {
  const [completedSteps, setCompletedSteps] = useLocalStorage<string[]>(
    "atelier-recipe-crispy-chicken-steps",
    [],
  );

  const toggleStep = (stepId: string) => {
    setCompletedSteps((current) =>
      current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : [...current, stepId],
    );
  };

  return (
    <article className="recipe-detail page-stack">
      <Link className="back-link" to="/recipes">
        <ArrowLeft aria-hidden="true" size={17} />返回菜谱库
      </Link>

      <header className="recipe-hero">
        <img src={recipe.coverImage} alt="香煎脆皮鸡腿排完整摆盘参考" />
        <div className="recipe-hero-copy">
          <p className="eyebrow">主菜 · 鸡肉 · 第 1 周</p>
          <h1>{recipe.name}</h1>
          <p>{recipe.subtitle}</p>
          <div className="recipe-facts" aria-label="菜谱基本信息">
            <span>
              <Clock3 aria-hidden="true" size={18} />
              <small>总用时</small>
              <strong>{recipe.estimatedMinutes} 分钟</strong>
            </span>
            <span>
              <Users aria-hidden="true" size={18} />
              <small>份量</small>
              <strong>{recipe.servings} 人份</strong>
            </span>
            <span>
              <Flame aria-hidden="true" size={18} />
              <small>难度</small>
              <strong>入门</strong>
            </span>
          </div>
          <div className="tag-list">
            {recipe.techniqueTags.slice(0, 5).map((tag) => (
              <Tag key={tag} tone="olive">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </header>

      <nav className="recipe-anchor-nav" aria-label="菜谱章节">
        <a href="#ingredients">食材</a>
        <a href="#equipment">工具</a>
        <a href="#steps">制作步骤</a>
        <a href="#tips">关键技巧</a>
        <a href="#plating">摆盘</a>
      </nav>

      <section id="ingredients" className="recipe-section" aria-labelledby="ingredients-title">
        <SectionHeading
          eyebrow="INGREDIENTS"
          title="食材准备"
          titleId="ingredients-title"
          description="默认 2 人份。先按分组称量，再开始制作。"
        />
        <div className="ingredient-grid">
          {recipe.ingredients.map((group) => (
            <section className="ingredient-group" key={group.id}>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={`${group.id}-${item.name}`}>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.note}</small>
                    </div>
                    <span>{item.displayAmount}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section id="equipment" className="recipe-section" aria-labelledby="equipment-title">
        <SectionHeading
          eyebrow="EQUIPMENT"
          title="工具准备"
          titleId="equipment-title"
          description="温度计不是装饰，它是这一课最可靠的火候判断工具。"
        />
        <div className="equipment-grid">
          <section>
            <span className="section-icon" aria-hidden="true">
              <CookingPot size={21} />
            </span>
            <h3>必需工具</h3>
            <ul>
              {recipe.equipment.required.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <span className="section-icon" aria-hidden="true">
              <Thermometer size={21} />
            </span>
            <h3>强烈建议</h3>
            <ul>
              {recipe.equipment.recommended.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="steps" className="recipe-section" aria-labelledby="steps-title">
        <SectionHeading
          eyebrow="COOKING FLOW"
          title="制作步骤"
          titleId="steps-title"
          description="每一步都写明了时间和完成状态。勾选后会保存在当前设备。"
          action={
            <div className="step-progress-copy">
              {completedSteps.length} / {recipe.steps.length} 已完成
            </div>
          }
        />
        <ProgressBar
          className="step-progress"
          value={completedSteps.length}
          max={recipe.steps.length}
          label="菜谱制作步骤进度"
        />
        <ol className="recipe-steps">
          {recipe.steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            return (
              <li key={step.id} className={isCompleted ? "is-completed" : ""}>
                <div className="step-card-header">
                  <span className="step-number">{step.order.toString().padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <div className="step-meta">
                      <span>
                        <Clock3 aria-hidden="true" size={15} />约 {step.estimatedMinutes} 分钟
                      </span>
                      {step.heat ? (
                        <span>
                          <Flame aria-hidden="true" size={15} />{step.heat}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <label className="step-check">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleStep(step.id)}
                    />
                    <span aria-hidden="true">
                      {isCompleted ? <Check size={16} /> : null}
                    </span>
                    <span className="sr-only">将“{step.title}”标记为完成</span>
                  </label>
                </div>
                <ol className="instruction-list">
                  {step.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ol>
                <div className="doneness-cue">
                  <ChefHat aria-hidden="true" size={18} />
                  <p>
                    <strong>完成判断</strong>
                    {step.donenessCue}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="tips" className="recipe-section" aria-labelledby="tips-title">
        <SectionHeading
          eyebrow="KEY TECHNIQUES"
          title="关键技巧与补救"
          titleId="tips-title"
        />
        <div className="tips-grid">
          <div className="key-tips-card">
            <div className="card-heading">
              <Lightbulb aria-hidden="true" size={21} />
              <h3>记住这六点</h3>
            </div>
            <ul>
              {recipe.keyTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="safety-card">
            <div className="card-heading">
              <ShieldCheck aria-hidden="true" size={21} />
              <h3>食品安全</h3>
            </div>
            <strong>{recipe.safety.minimumPoultryTemperatureC}°C</strong>
            <p>{recipe.safety.measurement}</p>
            <a href={recipe.safety.sourceUrl} target="_blank" rel="noreferrer">
              查看安全温度来源
            </a>
          </div>
        </div>

        <details className="mistake-details">
          <summary>
            <AlertTriangle aria-hidden="true" size={19} />
            常见失败与当场补救
          </summary>
          <div className="mistake-list">
            {recipe.commonMistakes.map((mistake) => (
              <article key={mistake.symptom}>
                <h3>{mistake.symptom}</h3>
                <p>
                  <strong>可能原因：</strong>
                  {mistake.causes.join("、")}
                </p>
                <p>
                  <strong>当场补救：</strong>
                  {mistake.rescue}
                </p>
                <p>
                  <strong>下次改进：</strong>
                  {mistake.nextTime}
                </p>
              </article>
            ))}
          </div>
        </details>
      </section>

      <section id="plating" className="recipe-section plating-section" aria-labelledby="plating-title">
        <div className="plating-image">
          <img src={recipe.coverImage} alt="鸡腿与土豆泥分开摆放的最终餐盘参考" />
          <span>
            <Sparkles aria-hidden="true" size={17} />摆盘方向参考
          </span>
        </div>
        <div className="plating-copy">
          <p className="eyebrow">PLATING GUIDE</p>
          <h2 id="plating-title">让鸡腿成为主角，也让盘面呼吸。</h2>
          <p className="plating-intro">使用 {recipe.platingGuide.plate}。</p>
          <ol>
            {recipe.platingGuide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="plating-note">
            <ListChecks aria-hidden="true" size={19} />
            <p>{recipe.platingGuide.principles.join("；")}。</p>
          </div>
        </div>
      </section>

      <footer className="recipe-footer-note">
        <ShoppingBasket aria-hidden="true" size={20} />
        <p>第一次制作以完成和记录为主。下次只选择一到两个最需要改善的点。</p>
      </footer>
    </article>
  );
}
