import {createStore, combineReducers} from "redux"

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {CollapseReducer} from './reducers/CollapseReducer'
import {LoadingReducer} from "./reducers/LoadingReducer";

const persistConfig = {
    // 按key存储
    key: 'Hhnail',
    // 存到本地浏览器storage中（在Application中查看）
    storage,
    // blacklist 黑名单 不保存Array中的值
    blacklist: ['LoadingReducer']
}

const reducer = combineReducers({
    CollapseReducer,
    LoadingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
}
