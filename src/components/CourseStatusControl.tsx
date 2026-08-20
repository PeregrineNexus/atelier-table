import { Check, Play } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { CourseStatus } from "../types";

export type CourseStatusControlProps = {
  status: CourseStatus;
  setStatus: Dispatch<SetStateAction<CourseStatus>>;
  compact?: boolean;
};

const copy = {
  not_started: "开始第 1 周",
  in_progress: "标记为已完成",
  completed: "已完成本周",
};

export function CourseStatusControl({
  status,
  setStatus,
  compact = false,
}: CourseStatusControlProps) {
  const nextStatus: CourseStatus =
    status === "not_started" ? "in_progress" : "completed";

  return (
    <div className="status-control">
      <button
        className={`primary-button${compact ? " primary-button--compact" : ""}`}
        type="button"
        onClick={() => setStatus(nextStatus)}
        disabled={status === "completed"}
      >
        {status === "completed" ? (
          <Check aria-hidden="true" size={18} />
        ) : (
          <Play aria-hidden="true" size={18} fill="currentColor" />
        )}
        <span>{copy[status]}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        当前课程状态：{copy[status]}
      </span>
    </div>
  );
}
