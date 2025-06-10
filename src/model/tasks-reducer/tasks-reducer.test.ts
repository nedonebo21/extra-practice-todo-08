import {beforeEach, expect, test} from "vitest";
import {TasksState} from "../../App.tsx";
import {
    changeTaskStatusAC, changeTaskTitleAC,
    createTaskAC,
    createTodolistAC,
    deleteTaskAC,
    deleteTodolistAC,
    tasksReducer
} from "./tasks-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: true},
        ],
    }
})

test('array should be created for new todo', () => {
    const endState = tasksReducer(startState, createTodolistAC('todolistId3'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
    expect(keys.length).toBe(3)
    expect(keys[2]).toBe('todolistId3')
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState, deleteTaskAC({todolistId: 'todolistId2', taskId: '2'})
    )

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
        ],
    })
})

test('correct task should be added at correct array', () => {
    const endState = tasksReducer(
        startState, createTaskAC({todolistId: 'todolistId2', title: 'yo'})
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(3)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('yo')
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should change status', () => {
    const endState = tasksReducer(startState,
        changeTaskStatusAC({todolistId: 'todolistId2', taskId: '2', isDone: false}))

    expect(endState.todolistId2[1].isDone).toBe(false)
    expect(endState.todolistId1[1].isDone).toBe(true)
})

test('correct task should change its title', () => {
    const title = 'qwe'
    const endState = tasksReducer(startState,
        changeTaskTitleAC({todolistId: 'todolistId2', taskId: '2', title})
    )
    expect(endState.todolistId2[1].title).toBe(title)
    expect(endState.todolistId2.length).toBe(2)
    expect(endState.todolistId1[1].title).not.toBe(title)
})