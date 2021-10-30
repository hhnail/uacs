import {Redirect, Route, Switch} from 'react-router-dom'
import 'nprogress/nprogress.css'
import '../../../util/http'
import AssciationSquare from "../AssociationSquare";
import AssociationDetail from "../AssociationDetail";

function AppRouter(props) {
    return (
        <Switch>
            <Route path="/user" component={AssciationSquare} exact></Route>
            <Route path="/user/associationDetail" component={AssciationSquare} exact></Route>
            <Route path="/user/associationDetail/:associationId" component={AssociationDetail} />
            <Redirect from="/" to="/user" exact/>
        </Switch>
    )
}

export default AppRouter