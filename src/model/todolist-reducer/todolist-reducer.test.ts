import {Todolist} from "../../App.tsx";
import {
    addTodosAC,
    changeTodosFilterAC,
    changeTodosTitleAC,
    deleteTodosAC,
    todolistReducer
} from "./todolist-reducer.ts";
import {v1} from "uuid";
import {test,expect, beforeEach} from 'vitest'

let todolistId1: string
let todolistId2: string
let startState: Todolist[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todo should be deleted', () => {
    const endState = todolistReducer(startState, deleteTodosAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)
})
test('correct todo should be added', () => {

    const title = 'new todo'
    const endState = todolistReducer(startState, addTodosAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})
test('correct todo should be change his title', () => {

    const title = 'new title'
    const endState = todolistReducer(startState, changeTodosTitleAC({todolistId: todolistId1, title}))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(title)
})

test('correct todo should be change his filter', () => {

    const filter = 'completed'
    const endState = todolistReducer(startState, changeTodosFilterAC({todolistId: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})