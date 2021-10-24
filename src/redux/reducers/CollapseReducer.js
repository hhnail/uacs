export const CollapseReducer = (preState = {
    isCollapsed: false
}, action) => {

    let {type} = action
    switch (type) {
        case "change_collapsed":
            let newState = {...preState}
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            console.log("未找到对应的action")
            return preState
    }
    return preState
}
