import React from "react";
import { Exercise as ExerciseType } from "../types";
import "./Exercise.css";

interface ExerciseProps {
  exercise: ExerciseType;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  return (
    <div className="exercise-card">
      <div className="exercise-card__name">{exercise.name}</div>
      <div className="exercise-card__info">
        <span className="exercise-card__sets">{exercise.numberOfSet}</span>
        <span className="exercise-card__detail">{exercise.detail}</span>
      </div>
    </div>
  );
};

export default Exercise;
