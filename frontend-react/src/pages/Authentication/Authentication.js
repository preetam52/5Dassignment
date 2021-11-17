import React from 'react'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import "./styles.css"
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

export default function Authentication(props) {
    const authRoutes = [
        {path: "/signup", component: Signup},
        {path: "/signin", component: Signin}
    ]
    return (
        <div class="container">
            <div className="auth-container">
            {/* <Route exact={true} path={props.match.path} component={Signup} /> */}
                {
                    authRoutes.map((e,i) => <Route exact path={`${props.match.path}${e.path}`} component={e.component} />)
      
                }
                {/* <Redirect from="/auth" to="/auth/signup" exact /> */}
            </div>
            
        </div>
    )
}
