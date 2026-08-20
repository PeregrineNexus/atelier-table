import { ChefHat } from "lucide-react";
import { ActionLink } from "../components/ui";

export function NotFoundPage() {
  return (
    <section className="empty-state not-found">
      <ChefHat aria-hidden="true" size={29} />
      <p className="eyebrow">404</p>
      <h1>这页还没有上桌。</h1>
      <p>返回首页，继续当前课程。</p>
      <ActionLink to="/">回到首页</ActionLink>
    </section>
  );
}
