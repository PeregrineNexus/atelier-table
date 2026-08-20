import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LearnPlanPage } from "./pages/LearnPlanPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { RecipeLibraryPage } from "./pages/RecipeLibraryPage";
import { WeekDetailPage } from "./pages/WeekDetailPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnPlanPage />} />
        <Route path="learn/week/1" element={<WeekDetailPage />} />
        <Route path="recipes" element={<RecipeLibraryPage />} />
        <Route
          path="recipes/crispy-chicken-thigh-set"
          element={<RecipeDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
