import React, { Component } from 'react'
import { Alert } from 'antd'

export default class Home extends Component {

    onClose = (e) => {
        console.log(e, 'I was closed.');
    };
    
    render() {
        return (
            <div className="App">
                <Alert
                    style={{ height: '300px' }}
                    message="Error Text"
                    description="系统出现错误！请稍后重试或联系管理员：18030290101"
                    type="error"
                    closable={true}
                    onClose={this.onClose}
                />
            </div>
        )
    }
}
