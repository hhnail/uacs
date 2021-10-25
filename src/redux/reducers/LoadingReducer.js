import {REDUXSTATE} from "../../constants/redux";

export const LoadingReducer = (preState = {
    isLoading: false
}, action) => {
    let {type, payload} = action
    switch (type) {
        case REDUXSTATE.CHANGE_ISLOADING.type:
            let newState = {...preState}
            newState.isLoading = payload
            return newState
        default:
            console.log("未找到对应的action")
            return preState
    }
    return preState
}
