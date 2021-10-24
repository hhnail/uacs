import {createStore, combineReducers} from "redux"

import {CollapseReducer} from './reducers/CollapseReducer'

const reducer = combineReducers({
    CollapseReducer
})

const store = createStore(reducer)

export default store