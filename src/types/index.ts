export interface Data {
  id: number;
  day: string;
  dayNumber: number;
  workouts: Workout[];
}

export interface Exercise {
  id: string;
  name: string;
  numberOfSet: string;
  detail: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}