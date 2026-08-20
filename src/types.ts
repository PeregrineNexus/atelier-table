export type CourseStatus = "not_started" | "in_progress" | "completed";

export type PrepItem = {
  id: string;
  title: string;
  estimatedMinutes: number;
  details: string;
};

export type ScheduleItem = {
  startMinute: number;
  endMinute: number;
  task: string;
};

export type CourseWeek = {
  weekNumber: number;
  title: string;
  status: CourseStatus;
  estimatedMinutes: number;
  firstAttemptBufferMinutes: number;
  learningGoals: string[];
  fridayPrep: PrepItem[];
  weekendSchedule: ScheduleItem[];
  recipeIds: string[];
  reviewPrompts: string[];
};

export type IngredientItem = {
  name: string;
  amount: number | null;
  unit: string | null;
  displayAmount: string;
  note: string;
};

export type IngredientGroup = {
  id: string;
  name: string;
  items: IngredientItem[];
};

export type RecipeStep = {
  id: string;
  order: number;
  title: string;
  estimatedMinutes: number;
  heat?: string;
  safeInternalTemperatureC?: number;
  instructions: string[];
  donenessCue: string;
  critical: boolean;
};

export type Recipe = {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  difficulty: string;
  servings: number;
  estimatedMinutes: number;
  coverImage: string;
  techniqueTags: string[];
  ingredients: IngredientGroup[];
  equipment: {
    required: string[];
    recommended: string[];
    avoid: string[];
  };
  advancePrep: Array<{
    title: string;
    leadTime: string;
    instructions: string[];
  }>;
  steps: RecipeStep[];
  keyTips: string[];
  commonMistakes: Array<{
    symptom: string;
    causes: string[];
    rescue: string;
    nextTime: string;
  }>;
  platingGuide: {
    plate: string;
    principles: string[];
    steps: string[];
    avoid: string[];
  };
  inspirationImages: Array<{
    id: string;
    title: string;
    style: string;
    description: string;
    image: string;
    layoutSteps: string[];
  }>;
  safety: {
    minimumPoultryTemperatureC: number;
    minimumPoultryTemperatureF: number;
    measurement: string;
    sourceName: string;
    sourceUrl: string;
  };
};

export type CoursePreview = {
  weekNumber: number;
  title: string;
  focus: string;
  duration: string;
  status: CourseStatus | "coming_soon";
  recipeId?: string;
};
