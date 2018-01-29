import uuid from 'uuid/v1'

// API URL Constant
const API_URL = 'http://localhost:2000/todos'


// todo actions

const ADD_TODO_REQUEST= 'ADD_TODO_REQUEST'
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE'



const FETCH_REQUEST = 'FETCH_REQUEST'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILURE = 'FETCH_FAILURE'

const MARK_TODO = 'MARK_TODO'

const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE'

export const addTodo = value => {
    return function (dispatch) {
        dispatch({
          type: ADD_TODO_REQUEST
        })
        fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: uuid(),
            value: value,
            done: false
          }),
        })
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: ADD_TODO_SUCCESS,
              todo: data
            })
          })
          .catch(error => {
            dispatch({
              type: ADD_TODO_FAILURE,
              error: error
            })
          })
      }
}


export function getTodos(){
    return function (dispatch) {
        dispatch({
          type: FETCH_REQUEST
        })
        fetch(API_URL)
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: FETCH_SUCCESS,
              todos: data
            })
          })
          .catch(error => {
            dispatch({
              type: FETCH_FAILURE,
              error: error
            })
          })
      }
}

export const markTodo = value => {
    return {
        type: MARK_TODO,
        value
    }
}

export const deleteTodo = id => {
    return function (dispatch) {
        dispatch({
          type: DELETE_TODO_REQUEST
        })
        fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: DELETE_TODO_SUCCESS,
              id: id
            })
          })
          .catch(error => {
            dispatch({
              type: DELETE_TODO_FAILURE,
              error: error
            })
          })
      }
}