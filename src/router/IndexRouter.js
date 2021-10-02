import { React, Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import User from '../components/User'
import Login from '../views/Login'
import SandBox from '../views/SandBox'
import UserManage from '../components/UserManage'

export default class IndexRouter extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/user" exact={true} component={User} />
                    <Route path="/user/userManage" component={UserManage} />
                    {/* <Route path="/" component={AssociationSandBox} /> */}
                    <Route
                        path="/"
                        render={() =>
                            // 用浏览器的cookie保存session token
                            localStorage.getItem("token") ? <SandBox /> : <Login />
                            // localStorage.getItem("token") ? <SandBox /> : <SandBox />
                        } />
                </Switch>
            </HashRouter>
        )
    }
}

