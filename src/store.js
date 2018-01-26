import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createLogger } from 'redux-logger'
import todoReducer from './todos/ToDoReducer'

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true,
})

const store = createStore(todoReducer, composeWithDevTools(
    applyMiddleware(
        logger,
    ),
))

export default store