import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {addTasksAc, removeTaskAC, TasksReducer} from "./Reducers/TasksReducer";
import {changeFilterAC, FilterReducer} from "./Reducers/FilterReducer";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, tasksDispatch] = useReducer(TasksReducer,[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        /*let filteredTasks = tasks.filter(t => t.id != id);*/
        tasksDispatch(removeTaskAC(id));
    }

    const addTasks = (newTasks: string) => {
        /*setTasks([{id: v1(), title: newTasks, isDone: false}, ...tasks])*/
        tasksDispatch(addTasksAc(newTasks))
    }

    let [filter, filterDispatch] = useReducer(FilterReducer ,("all"));

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        filterDispatch(changeFilterAC(value));
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTasks={addTasks}/>
        </div>
    );
}

export default App;
