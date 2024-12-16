import { useState } from "react";
import { Container, Draggable, DropResult } from "react-smooth-dnd";
import IconPlus from "../assets/icons/plus.svg";
import { Data, Exercise, Workout } from "../types";
import { generateUniId, datas } from "../data";
import Workouts from "./Workout";
import "./DayColumn.css";

const DayColumn = () => {
    const [data, setData] = useState<Data[]>(datas);

    const handleAddWorkout = (idx: number) => {
        const newData = data.map((item: Data, index: number) => {
            if (idx === index) {
                const newWorkout: Workout = {
                    id: generateUniId(),
                    name: `Workout name ${item.workouts.length + 1}`,
                    exercises: [],
                };
                return {
                    ...item,
                    workouts: [...item.workouts, newWorkout],
                };
            }
            return item;
        });
        setData(newData);
    };

    const applyDrag = (arr: any[], dropResult: DropResult) => {
        const { removedIndex, addedIndex, payload } = dropResult;
        if (removedIndex === null && addedIndex === null) return arr;

        const result = arr ? [...arr] : [];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
        }
        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
        }
        return result;
    };

    const handleExerciseDrop = (idxData: number, idxWk: number, e: DropResult) => {
        const newData = [...data];
        newData[idxData].workouts[idxWk].exercises = applyDrag(
            newData[idxData].workouts[idxWk].exercises,
            e
        );
        setData(newData);
    };

    const handleAddExercise = (idData: number, idWorkout: string) => {
        const newData = data.map((item) => {
            if (idData === item.id) {
                const newWorkouts = item.workouts.map((wks, idx) => {
                    if (idWorkout === wks.id) {
                        const newExercises: Exercise = {
                            id: generateUniId(),
                            name: `Exercise name ${wks.exercises.length + 1}`,
                            numberOfSet: "1x",
                            detail: "30 lb x 10",
                        };
                        return {
                            ...wks,
                            exercises: [...wks.exercises, newExercises],
                        };
                    }
                    return wks;
                });
                return { ...item, workouts: newWorkouts };
            }
            return item;
        });
        setData(newData);
    };

    const handleWorkoutDrop = (idxData: number, e: DropResult) => {
        const newItems = [...data];

        if (!newItems[idxData].workouts) {
            newItems[idxData].workouts = [];
        }

        newItems[idxData].workouts = applyDrag(newItems[idxData].workouts, e);
        setData(newItems);
    };

    const getWorkoutPayload = (idxData: number, idxWk: number) => {
        return data[idxData].workouts[idxWk];
    };

    const getExercisePayload = (
        idxData: number,
        idxWk: number,
        index: number
    ) => {
        return data?.[idxData]?.workouts[idxWk]?.exercises[index];
    };

    return (
        <Container>
            <div className="app-container">
                {data.map((item: Data, idx: number) => {
                    return (
                        <div className="app-container__column" key={idx}>
                            <span className="app-container__day-name">{item.day}</span>
                            <div className="app-container__content">
                                <div
                                    className={`app-container__workout-content ${item.workouts.length > 0 ? "" : "app-container__workout-content--empty"
                                        }`}
                                >
                                    <div className="app-container__header">
                                        <span
                                            className={`app-container__day-number ${new Date().getDate() === item.dayNumber && "app-container__day-number--active"
                                                }`}
                                        >
                                            {item.dayNumber}
                                        </span>
                                        <img
                                            src={IconPlus}
                                            alt="Add Workout"
                                            className="app-container__add-workout-icon"
                                            onClick={() => handleAddWorkout(idx)}
                                        />
                                    </div>
                                    <div className="app-container__workout-list">
                                        <Container
                                            behaviour="drop-zone"
                                            groupName="workout"
                                            onDrop={(e) => handleWorkoutDrop(idx, e)}
                                            getChildPayload={(index) => getWorkoutPayload(idx, index)}
                                            {...({} as any)}
                                        >
                                            {item.workouts.length > 0 ? (
                                                item.workouts.map((workout, idxWk) => {
                                                    return (
                                                        <>
                                                            <Draggable key={workout.id} {...({} as any)}>
                                                                <Workouts
                                                                    workout={workout}
                                                                    idData={item.id}
                                                                    idxData={idx}
                                                                    idxWorkout={idxWk}
                                                                    handleExerciseDrop={handleExerciseDrop}
                                                                    getExercisePayload={getExercisePayload}
                                                                    handleAddExercise={handleAddExercise}
                                                                />
                                                            </Draggable>
                                                            {idxWk === item.workouts.length - 1 && (
                                                                <div className="app-container__placeholder"></div>
                                                            )}
                                                        </>
                                                    );
                                                })
                                            ) : (
                                                <div className="app-container__placeholder"></div>
                                            )}
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
};

export default DayColumn;
