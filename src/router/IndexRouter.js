import { React, Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import UserBox from '../pages/user/UserBox'
import Login from '../pages/manage/Login'
import SandBox from '../pages/manage/ManageBox'


export default class IndexRouter extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    {/*使用者路由*/}
                    <Route path="/user" render={() =>
                        // 用浏览器的cookie保存session token
                        localStorage.getItem("userInfo") ? <UserBox /> : <Login />
                    }/>

                    {/*管理员路由*/}
                    <Route path="/"
                        render={() =>
                            // 用浏览器的cookie保存session token
                            localStorage.getItem("userInfo") ? <SandBox /> : <Login />
                        }/>

                </Switch>
            </HashRouter>
        )
    }
}

