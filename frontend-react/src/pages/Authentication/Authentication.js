import React from 'react'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import "./styles.css"
import { Route, Switch, Redirect } from 'react-router-dom';

export default function Authentication(props) {
    const authRoutes = [
        // {path: "/", redirectTo: "/auth/signup"},
        {path: "signup", component: Signup},
        {path: "signin", component: Signin},
        {path:'/auth', redirectTo: !sessionStorage.getItem('userId') ? '/auth/signin' : '/home'},

    ]
    return (
        <div class="container">
            <div className="auth-container">
                
            {/* <Route exact={true} path={props.match.path} component={Signup} /> */}
            <Switch>
                {
                    authRoutes.map((route,i) => route.redirectTo ? <Redirect key={route.path} to={route.redirectTo}/> : <Route exact key={route.path} path={`${props.match.path}${route.path}`} component={route.component} />)
      
                }
                </Switch>
                {/* <Redirect from="/auth" to="/auth/signup" exact /> */}
            </div>
            
        </div>
    )
}
