import {FilterValues, Todolist} from "../../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

type TodoReducerActionsType = DeleteTodosACType
    | AddTodosACType
    | ChangeTodosTitleACType
    | ChangeTodosFilterACType

export const todolistReducer = (state: Todolist[] = initialState, action: TodoReducerActionsType): Todolist[] => {
    switch (action.type) {
        case 'delete_todos':
            return state.filter(el => el.id !== action.payload.todolistId)
        case 'add_todos':
            const newTodo: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [
                ...state,
                newTodo
            ]
        case 'change_todos_title':
            return state.map(el => el.id === action.payload.todolistId
                ? {...el, title: action.payload.title}
                : el)
        case 'change_todos_filter':
            return state.map(el => el.id === action.payload.todolistId
                ? {...el, filter: action.payload.filter}
                : el)
        default:
            return state
    }
}

type DeleteTodosACType = ReturnType<typeof deleteTodosAC>
export const deleteTodosAC = (todolistId: string) => ({
    type: 'delete_todos',
    payload: {todolistId}
} as const)

type AddTodosACType = ReturnType<typeof addTodosAC>
export const addTodosAC = (title: string) => ({
    type: 'add_todos', payload: {title, id: v1()}
} as const)

type ChangeTodosTitleACType = ReturnType<typeof changeTodosTitleAC>
export const changeTodosTitleAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'change_todos_title', payload: {title, todolistId}
} as const)

type ChangeTodosFilterACType = ReturnType<typeof changeTodosFilterAC>
export const changeTodosFilterAC = (
    {todolistId, filter}: { todolistId: string, filter: FilterValues }
) => ({
    type: 'change_todos_filter', payload: {todolistId, filter}
} as const)