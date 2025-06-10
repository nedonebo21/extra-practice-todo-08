import {TasksState} from "../../App.tsx";
import {v1} from "uuid";

const initialState: TasksState = {}

type TasksReducerActionsType = CreateTodolistAC | DeleteTodolistACType
export const tasksReducer = (state = initialState, action: TasksReducerActionsType) => {
    switch (action.type){
        case 'create_todolist':
            return {...state, [action.payload.id]: []}
        case 'delete_todolist':
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        default:
            return state
    }
}

type CreateTodolistAC = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: {title, id: v1()}
}as const)

type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => ({
    type: 'delete_todolist',
    payload: {
        todolistId
    }
}as const)