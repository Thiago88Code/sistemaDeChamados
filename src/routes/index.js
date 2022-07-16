import {Switch} from "react-router-dom"
import RouteWrapper from "./Route"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import DashBoard from "../pages/DashBoard"
import Costumers from "../pages/Costumers"
import Profile from "../pages/Profile"
import New from "../pages/New"

export default function Routes(){
    return(
        <Switch>
            <RouteWrapper exact path = "/" component={SignIn} />
            <RouteWrapper exact path = "/register" component={SignUp} />
            <RouteWrapper exact  path = "/dashboard" component={DashBoard} isPrivate/>
            <RouteWrapper exact  path = "/costumers" component={Costumers} isPrivate/>
            <RouteWrapper exact  path = "/profile" component={Profile} isPrivate/>
            <RouteWrapper exact  path = "/new" component={New} isPrivate/>
            <RouteWrapper exact  path = "/new/:id" component={New} isPrivate/>
        </Switch>
    )

    
}