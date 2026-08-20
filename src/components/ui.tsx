import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

export type TagProps = ComponentProps<"span"> & {
  tone?: "neutral" | "olive" | "warm";
};

export function Tag({ tone = "neutral", className = "", ...props }: TagProps) {
  return <span className={`tag tag--${tone} ${className}`.trim()} {...props} />;
}

export type ProgressBarProps = ComponentProps<"div"> & {
  value: number;
  max?: number;
  label: string;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  className = "",
  ...props
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div
      className={`progress ${className}`.trim()}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      {...props}
    >
      <span className="progress-fill" style={{ width: `${percentage}%` }} />
      <span className="sr-only">{Math.round(percentage)}% 完成</span>
    </div>
  );
}

export type ActionLinkProps = LinkProps & {
  variant?: "primary" | "secondary" | "quiet";
  icon?: boolean;
};

export function ActionLink({
  variant = "primary",
  icon = true,
  className = "",
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={`action-link action-link--${variant} ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={17} /> : null}
    </Link>
  );
}

export type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>
      {aside ? <div className="page-header-aside">{aside}</div> : null}
    </header>
  );
}

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  titleId?: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}
