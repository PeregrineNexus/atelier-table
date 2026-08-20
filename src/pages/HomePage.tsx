import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  ShoppingBasket,
} from "lucide-react";
import { CourseStatusControl } from "../components/CourseStatusControl";
import {
  ActionLink,
  ProgressBar,
  SectionHeading,
  Tag,
} from "../components/ui";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { crispyChickenRecipe, weekOne } from "../lib/data";
import type { CourseStatus } from "../types";

export function HomePage() {
  const [courseStatus, setCourseStatus] = useLocalStorage<CourseStatus>(
    "atelier-course-week-1-status",
    "not_started",
  );
  const completedWeeks = courseStatus === "completed" ? 1 : 0;

  return (
    <div className="page-stack home-page">
      <section className="welcome-row" aria-labelledby="welcome-title">
        <div>
          <p className="eyebrow">WEEKEND COOKING · WEEK 01</p>
          <h1 id="welcome-title">这周，从一块脆皮鸡腿开始。</h1>
          <p>
            用两小时练习火候、质地和留白。先把一道菜做明白，再进入下一周。
          </p>
        </div>
        <div className="week-progress-card">
          <div className="week-progress-copy">
            <span>8 周学习进度</span>
            <strong>{completedWeeks} / 8</strong>
          </div>
          <ProgressBar value={completedWeeks} max={8} label="8 周课程完成进度" />
        </div>
      </section>

      <section className="current-course" aria-labelledby="current-course-title">
        <div className="course-image-wrap">
          <img
            src={crispyChickenRecipe.coverImage}
            alt="脆皮鸡腿排与土豆泥、芦笋、西兰花和蘑菇的摆盘参考"
          />
          <span className="image-badge">当前课程</span>
        </div>
        <div className="course-content">
          <div className="course-kicker">
            <Tag tone="warm">第 1 周</Tag>
            <span>
              {courseStatus === "completed"
                ? "已完成"
                : courseStatus === "in_progress"
                  ? "进行中"
                  : "尚未开始"}
            </span>
          </div>
          <h2 id="current-course-title">{weekOne.title}</h2>
          <p className="course-summary">
            脆皮鸡腿排、奶油土豆泥、黄油芦笋、西兰花、焦香蘑菇与少量鸡肉锅汁。
          </p>
          <div className="meta-grid" aria-label="课程信息">
            <span>
              <Clock3 aria-hidden="true" size={17} />
              2～2.5 小时
            </span>
            <span>
              <Flame aria-hidden="true" size={17} />
              入门难度
            </span>
            <span>
              <CalendarDays aria-hidden="true" size={17} />
              周末完成
            </span>
          </div>
          <div className="tag-list" aria-label="本周训练技法">
            {crispyChickenRecipe.techniqueTags.slice(0, 4).map((tag) => (
              <Tag key={tag} tone="olive">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="course-actions">
            <CourseStatusControl status={courseStatus} setStatus={setCourseStatus} />
            <ActionLink to="/learn/week/1" variant="secondary">
              查看课程
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="friday-prep-title">
        <SectionHeading
          eyebrow="FRIDAY PREP"
          title="周五先准备好"
          titleId="friday-prep-title"
          description="周末开火前，把影响成败的准备提前完成。"
          action={
            <ActionLink to="/learn/week/1" variant="quiet">
              完整清单
            </ActionLink>
          }
        />
        <div className="prep-grid">
          {weekOne.fridayPrep.map((item, index) => (
            <article className="prep-card" key={item.id}>
              <span className="prep-number">0{index + 1}</span>
              <CheckCircle2 aria-hidden="true" size={20} />
              <h3>{item.title}</h3>
              <p>{item.details}</p>
              <span className="card-time">约 {item.estimatedMinutes} 分钟</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="library-preview-title">
        <SectionHeading
          eyebrow="YOUR LIBRARY"
          title="第一道菜，已经入库"
          titleId="library-preview-title"
          description="课程结束后，它仍是一份可以随时回看的完整菜谱。"
          action={
            <ActionLink to="/recipes" variant="quiet">
              进入菜谱库
            </ActionLink>
          }
        />
        <article className="library-preview-card">
          <img src={crispyChickenRecipe.coverImage} alt="香煎脆皮鸡腿排成品" />
          <div>
            <span className="library-icon" aria-hidden="true">
              <BookOpen size={20} />
            </span>
            <p className="eyebrow">主菜 · 鸡肉</p>
            <h3>{crispyChickenRecipe.name}</h3>
            <p>{crispyChickenRecipe.subtitle}</p>
            <div className="library-preview-meta">
              <span>
                <ShoppingBasket aria-hidden="true" size={16} />4 组食材
              </span>
              <span>
                <Clock3 aria-hidden="true" size={16} />
                {crispyChickenRecipe.estimatedMinutes} 分钟
              </span>
            </div>
            <ActionLink to={`/recipes/${crispyChickenRecipe.id}`} variant="secondary">
              打开菜谱
            </ActionLink>
          </div>
        </article>
      </section>
    </div>
  );
}
