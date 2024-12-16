import React from "react";
import { Container, Draggable, DropResult } from "react-smooth-dnd";
import IconPlus from "../assets/icons/plus.svg";
import IconDot from "../assets/icons/three-dot.svg";
import { Workout as WorkoutType, Exercise as ExerciseType } from "../types";
import Exercise from "./Exercise";
import "./Workout.css";

interface WorkoutProps {
  workout: WorkoutType;
  idData: number;
  idxData: number;
  idxWorkout: number;
  handleExerciseDrop: (idxData: number, idxWk: number, e: DropResult) => void;
  getExercisePayload: (
    idxData: number,
    idxWk: number,
    index: number
  ) => ExerciseType;
  handleAddExercise: (idData: number, idWorkout: string) => void;
}

const Workouts: React.FC<WorkoutProps> = ({
  workout,
  idData,
  idxData,
  idxWorkout,
  handleExerciseDrop,
  getExercisePayload,
  handleAddExercise,
}) => {
  return (
    <div className="workout-card">
      <div className="workout-card__header">
        <span
          className="workout-card__name"
          title={workout.name}
        >
          {workout.name}
        </span>
        <img
          src={IconDot}
          alt="icon dot"
          className="workout-card__icon-dot"
        />
      </div>
      <Container
        groupName="exercise"
        onDrop={(e) => handleExerciseDrop(idxData, idxWorkout, e)}
        getChildPayload={(index) =>
          getExercisePayload(idxData, idxWorkout, index)
        }
        {...({} as any)}
      >
        {workout.exercises.map((exercise) => (
          <Draggable key={exercise.id} {...({} as any)}>
            <Exercise exercise={exercise} />
          </Draggable>
        ))}
      </Container>
      <img
        src={IconPlus}
        className="workout-card__add-exercise"
        alt="icon plus"
        onClick={() => handleAddExercise(idData, workout.id)}
      />
    </div>
  );
};

export default Workouts;
