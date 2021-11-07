import React from "react";
import {ReactComponent as ViewIcon} from "../icons/view.svg";
import {ReactComponent as CommitIcon} from "../icons/commit.svg";
import {ReactComponent as DeleteIcon} from "../icons/delete.svg";
import Icon from "@ant-design/icons";


const OPTION_ICONS = {
    VIEW: <Icon component={ViewIcon} style={{fontSize:14}}/>,
    COMMIT: <Icon component={CommitIcon} style={{fontSize:14}}/>,
    DELETE:<Icon component={DeleteIcon} style={{fontSize:16}}/>,
}

export {OPTION_ICONS}