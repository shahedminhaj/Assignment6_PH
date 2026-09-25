export type Workout = {
  id: string | number;
  name: string;
  description: string;
  category: string[];
  equipment: string[];
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;   // minutes
  calories: number;   // kcal
  rating: number;
  image: string;
  instructions: string[];
};

export type FitLogState = {
  plan: Workout[];
  saved: Workout[];
  done: string[];   // array of workout IDs marked as done
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  saveForLater: (workout: Workout) => void;
  removeSaved: (id: string | number) => void;
  isInPlan: (id: string | number) => boolean;
  isSaved: (id: string | number) => boolean;
  isDone: (id: string | number) => boolean;
};