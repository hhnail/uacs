import {createStore, combineReducers} from "redux"

import {CollapseReducer} from './reducers/CollapseReducer'
import {LoadingReducer} from "./reducers/LoadingReducer";

const reducer = combineReducers({
    CollapseReducer,
    LoadingReducer
})

const store = createStore(reducer)

export default store