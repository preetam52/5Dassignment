import React from 'react'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import "./styles.css"
import { Route, Switch } from 'react-router-dom';

export default function Authentication(props) {
    const authRoutes = [
        // {path: "/", redirectTo: "/auth/signup"},
        {path: "signup", component: Signup},
        {path: "signin", component: Signin}
    ]
    return (
        <div class="container">
            <div className="auth-container">
                
            {/* <Route exact={true} path={props.match.path} component={Signup} /> */}
            <Switch>
                {
                    authRoutes.map((e,i) => <Route exact key={e.path} path={`${props.match.path}${e.path}`} component={e.component} />)
      
                }
                </Switch>
                {/* <Redirect from="/auth" to="/auth/signup" exact /> */}
            </div>
            
        </div>
    )
}
