// todo actions

const ADD_TODO = 'ADD_TODO'
const FETCH_TODOS = 'FETCH_TODOS'
const MARK_TODO = 'MARK_TODO'

export const addTodo = value => {
    return {
        type: ADD_TODO,
        value,
    }
}

export const fetchTodo = value => {
    return {
        type: FETCH_TODOS,
        value,
    }
}

export const markTodo = value => {
    return {
        type: MARK_TODO,
        value
    }
}