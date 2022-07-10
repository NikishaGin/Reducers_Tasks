import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TasksReducer = (state: TaskType [],action:bossType) => {
    switch (action.type){
        case "REMOVE-TASKS": {
            return state.filter(t=>t.id !== action.payload.id)
        }
        case "ADD-TASKS": {
            return [{id: v1(), title: action.payload.newTasks, isDone: false},...state]
        }
        default:
            return state

    }
}


type bossType = removeTaskACType | addTasksAcType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id:string) => {
    return{
        type: "REMOVE-TASKS",
        payload: {
            id
        }
    }as const
}



type addTasksAcType = ReturnType<typeof addTasksAc>
export const addTasksAc = (newTasks: string) => {
    return{
        type: "ADD-TASKS",
        payload: {newTasks}
    }as const
}


