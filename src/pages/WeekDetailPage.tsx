import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CourseStatusControl } from "../components/CourseStatusControl";
import { ActionLink, PageHeader, SectionHeading, Tag } from "../components/ui";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { crispyChickenRecipe, weekOne } from "../lib/data";
import type { CourseStatus } from "../types";

function formatMinute(minute: number) {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function WeekDetailPage() {
  const [courseStatus, setCourseStatus] = useLocalStorage<CourseStatus>(
    "atelier-course-week-1-status",
    "not_started",
  );

  return (
    <div className="page-stack">
      <Link className="back-link" to="/learn">
        <ArrowLeft aria-hidden="true" size={17} />返回学习计划
      </Link>

      <PageHeader
        eyebrow="WEEK 01 · FOUNDATION"
        title={weekOne.title}
        description="第一次不追求复杂。把鸡皮、土豆泥、蔬菜熟度和餐盘留白做清楚，就是这周的全部任务。"
        aside={<CourseStatusControl status={courseStatus} setStatus={setCourseStatus} compact />}
      />

      <div className="week-overview-grid">
        <section className="learning-goals" aria-labelledby="learning-goals-title">
          <SectionHeading
            eyebrow="LEARNING GOALS"
            title="本周训练目标"
            titleId="learning-goals-title"
          />
          <ul className="check-list">
            {weekOne.learningGoals.map((goal) => (
              <li key={goal}>
                <CheckCircle2 aria-hidden="true" size={19} />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="week-facts" aria-label="本周课程摘要">
          <div>
            <Clock3 aria-hidden="true" size={20} />
            <span>预计制作</span>
            <strong>2～2.5 小时</strong>
          </div>
          <div>
            <ListChecks aria-hidden="true" size={20} />
            <span>制作步骤</span>
            <strong>{crispyChickenRecipe.steps.length} 个阶段</strong>
          </div>
          <div>
            <BookOpen aria-hidden="true" size={20} />
            <span>关联菜谱</span>
            <strong>1 道</strong>
          </div>
        </aside>
      </div>

      <section className="content-section" aria-labelledby="prep-title">
        <SectionHeading
          eyebrow="FRIDAY PREP"
          title="周五准备"
          titleId="prep-title"
          description="共约 35 分钟。鸡皮的脆度，从提前一天开始。"
        />
        <ol className="detail-card-list">
          {weekOne.fridayPrep.map((item, index) => (
            <li key={item.id}>
              <span>{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.details}</p>
              </div>
              <Tag>{item.estimatedMinutes} 分钟</Tag>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section" aria-labelledby="schedule-title">
        <SectionHeading
          eyebrow="WEEKEND FLOW"
          title="周末时间线"
          titleId="schedule-title"
          description="先看完整节奏，再开火。可以重叠的任务已经排在同一时段。"
        />
        <ol className="timeline">
          {weekOne.weekendSchedule.map((item, index) => (
            <li key={`${item.startMinute}-${item.task}`}>
              <div className="timeline-marker">
                <span>{index + 1}</span>
              </div>
              <div className="timeline-time">
                {formatMinute(item.startMinute)}—{formatMinute(item.endMinute)}
              </div>
              <p>{item.task}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="recipe-callout" aria-labelledby="recipe-callout-title">
        <img src={crispyChickenRecipe.coverImage} alt="香煎脆皮鸡腿排摆盘参考" />
        <div>
          <Tag tone="olive">关联菜谱</Tag>
          <h2 id="recipe-callout-title">制作时，只需要打开这一页。</h2>
          <p>
            食材、工具、8 个操作阶段、熟度判断、失败补救和摆盘顺序都已经整理完成。
          </p>
          <ActionLink to={`/recipes/${crispyChickenRecipe.id}`}>进入完整菜谱</ActionLink>
        </div>
      </section>

      <section className="reflection-card" aria-labelledby="reflection-title">
        <div className="reflection-heading">
          <Lightbulb aria-hidden="true" size={22} />
          <div>
            <p className="eyebrow">AFTER COOKING</p>
            <h2 id="reflection-title">完成后，用五分钟复盘</h2>
          </div>
        </div>
        <ul>
          {weekOne.reviewPrompts.slice(0, 4).map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
