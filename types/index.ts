export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export type FitLogState = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  saveForLater: (workout: Workout) => void;
  removeSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
};