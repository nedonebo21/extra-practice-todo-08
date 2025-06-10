import {Task, TasksState} from "../../App.tsx";
import {v1} from "uuid";

const initialState: TasksState = {}

type TasksReducerActionsType = CreateTodolistAC
    | DeleteTodolistACType
    | DeleteTaskACType
    | AddTasksACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType

export const tasksReducer = (state: TasksState = initialState, action: TasksReducerActionsType) => {
    switch (action.type) {
        case 'create_todolist':
            return {
                ...state,
                [action.payload.id]: []
            }
        case 'delete_todolist':
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        case 'delete_task':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case "add_task":
            const newTask: Task = {id: action.payload.taskId, title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        case 'change_task_status':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                        ? {...el, isDone: action.payload.isDone}
                        : el
                    )
            }
        case 'change_task_title':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                        ? {...el, title: action.payload.title}
                        : el
                    )
            }
        default:
            return state
    }
}

type CreateTodolistAC = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (id: string) => ({
    type: 'create_todolist',
    payload: {id}
} as const)

type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => ({
    type: 'delete_todolist',
    payload: {todolistId}
} as const)

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => ({
    type: 'delete_task',
    payload: {todolistId, taskId}
} as const)

type AddTasksACType = ReturnType<typeof createTaskAC>
export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'add_task',
    payload: {todolistId, title, taskId: v1()}
} as const)

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (
    {todolistId, taskId, isDone}: { todolistId: string, taskId: string, isDone: boolean }
) => ({
    type: 'change_task_status',
    payload: {todolistId, taskId, isDone}
} as const)

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (
    {todolistId, taskId, title}: { todolistId: string, taskId: string, title: string }
) => ({
    type: 'change_task_title',
    payload: {todolistId, taskId, title}
} as const)