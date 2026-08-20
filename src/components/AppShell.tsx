import {
  BookOpen,
  CalendarRange,
  ChefHat,
  Home,
  Search,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "首页", icon: Home, end: true },
  { to: "/learn", label: "学习计划", icon: CalendarRange },
  { to: "/recipes", label: "菜谱库", icon: BookOpen },
];

export function AppShell() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>

      <aside className="side-nav" aria-label="主导航">
        <NavLink className="brand" to="/" aria-label="Atelier Table 首页">
          <span className="brand-mark" aria-hidden="true">
            <ChefHat size={22} strokeWidth={1.7} />
          </span>
          <span>
            <strong>Atelier Table</strong>
            <small>周末西餐学习</small>
          </span>
        </NavLink>

        <nav className="nav-list">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `nav-item${isActive ? " is-active" : ""}`
              }
              end={end}
              to={to}
            >
              <Icon aria-hidden="true" size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="nav-note">
          <Search aria-hidden="true" size={17} />
          <p>先学会一道菜，再慢慢建立自己的料理知识库。</p>
        </div>
      </aside>

      <div className="page-shell">
        <header className="mobile-header">
          <NavLink className="mobile-brand" to="/">
            <ChefHat aria-hidden="true" size={21} />
            <span>Atelier Table</span>
          </NavLink>
          <span className="mobile-context">
            {location.pathname.startsWith("/recipes")
              ? "菜谱库"
              : location.pathname.startsWith("/learn")
                ? "学习计划"
                : "本周学习"}
          </span>
        </header>

        <main id="main-content" className="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <nav className="bottom-nav" aria-label="移动端主导航">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              `bottom-nav-item${isActive ? " is-active" : ""}`
            }
            end={end}
            to={to}
          >
            <Icon aria-hidden="true" size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
