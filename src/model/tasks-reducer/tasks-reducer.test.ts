import {beforeEach, expect, test} from "vitest";
import {TasksState} from "../../App.tsx";
import {v1} from "uuid";
import {createTodolistAC, deleteTodolistAC, tasksReducer} from "./tasks-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }
})

test('array should be created fot new todo', () =>{
    const endState = tasksReducer(startState, createTodolistAC('New Todo'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey){
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () =>{
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})