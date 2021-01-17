import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import contato from './ducks/contato'

const reducers = combineReducers({
    contato
})

export default store = createStore(reducers, compose(applyMiddleware(thunk)))