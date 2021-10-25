import {REDUXSTATE} from "../../constants/redux";

export const CollapseReducer = (preState = {
    isCollapsed: false
}, action) => {
    let {type} = action
    switch (type) {
        case REDUXSTATE.CHANGE_COLLAPSED.type:
            let newState = {...preState}
            newState.isCollapsed = !newState.isCollapsed
            console.log(newState.isCollapsed ? '折叠' : '展开')
            return newState
        default:
            console.log("未找到对应的action")
            return preState
    }
    return preState
}
