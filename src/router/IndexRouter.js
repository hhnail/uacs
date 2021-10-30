import { React, Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import UserBox from '../pages/UserBox'
import Login from '../views/Login'
import SandBox from '../views/SandBox'


export default class IndexRouter extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    {/*使用者路由*/}
                    <Route path="/user" component={UserBox} />
                    {/*<Route path="/user/userManage" component={UserManage} />*/}
                    {/*<Route path="/user/associationDetail/:id" component={AssociationDetail} />*/}
                    {/*管理员路由*/}
                    <Route
                        path="/"
                        render={() =>
                            // 用浏览器的cookie保存session token
                            localStorage.getItem("userInfo") ? <SandBox /> : <Login />
                            // localStorage.getItem("token") ? <SandBox /> : <SandBox />
                        } />
                </Switch>
            </HashRouter>
        )
    }
}

