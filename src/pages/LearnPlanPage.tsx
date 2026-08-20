import { Check, ChevronRight, Clock3, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, ProgressBar, Tag } from "../components/ui";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { coursePlan } from "../lib/data";
import type { CourseStatus } from "../types";

const statusCopy = {
  not_started: "尚未开始",
  in_progress: "进行中",
  completed: "已完成",
  coming_soon: "内容准备中",
};

export function LearnPlanPage() {
  const [courseStatus] = useLocalStorage<CourseStatus>(
    "atelier-course-week-1-status",
    "not_started",
  );
  const completedWeeks = courseStatus === "completed" ? 1 : 0;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="8-WEEK PATH"
        title="八个周末，建立一套基本功。"
        description="课程按能力递进组织。每周只聚焦一组关键动作，让火候、酱汁和摆盘逐渐成为习惯。"
        aside={
          <div className="plan-progress">
            <span>整体进度</span>
            <strong>{completedWeeks} / 8</strong>
            <ProgressBar value={completedWeeks} max={8} label="8 周学习计划进度" />
          </div>
        }
      />

      <section aria-labelledby="course-list-title">
        <h2 id="course-list-title" className="sr-only">
          课程列表
        </h2>
        <ol className="course-list">
          {coursePlan.map((course) => {
            const status = course.weekNumber === 1 ? courseStatus : course.status;
            const isAvailable = course.weekNumber === 1;
            const content = (
              <>
                <div className="course-index" aria-hidden="true">
                  {status === "completed" ? <Check size={21} /> : course.weekNumber}
                </div>
                <div className="course-list-main">
                  <div className="course-list-topline">
                    <span>第 {course.weekNumber} 周</span>
                    <Tag tone={isAvailable ? "warm" : "neutral"}>
                      {statusCopy[status]}
                    </Tag>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.focus}</p>
                  <span className="course-duration">
                    <Clock3 aria-hidden="true" size={16} />
                    {course.duration}
                  </span>
                </div>
                <span className="course-list-action" aria-hidden="true">
                  {isAvailable ? <ChevronRight size={21} /> : <LockKeyhole size={17} />}
                </span>
              </>
            );

            return (
              <li key={course.weekNumber}>
                {isAvailable ? (
                  <Link className="course-list-card is-available" to="/learn/week/1">
                    {content}
                  </Link>
                ) : (
                  <div className="course-list-card" aria-label={`${course.title}，内容准备中`}>
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
