import {useState} from "react";
import {Editor} from 'react-draft-wysiwyg'
import {convertToRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


export default function AssociationEditor(props) {

    const [editorState, setEditorState] = useState("")

    const handleEditorChange = (editorState) => {
        // console.log("change")
        setEditorState(editorState)
    }

    // 失去焦点
    const handleOnBlur = () => {
        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        // console.log(htmlContent)
        // 子调用父传递过来的方法
        props.getContent(htmlContent)
    }

    return (
        <div>
            <Editor
                // 样式
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                eidtorClassName="eidtorClassName"
                editorState={editorState}
                onEditorStateChange={handleEditorChange} // 受控组件
                onBlur={handleOnBlur} // 失去焦点
            />
        </div>
    )
}