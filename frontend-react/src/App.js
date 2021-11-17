import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { routes } from './router';

class App extends Component {

  componentDidMount() {
    
    
    if(localStorage.getItem("user")) {
    }
}
  render() {
    return (
      <div className="app h-100%">
        
      <BrowserRouter>
        <Switch>
          {routes.map((route) => route.redirectTo ? <Redirect key={route.path} to={route.redirectTo}/> : <Route key={route.path} exact={true} path={route.path} component={route.component}/>)}
        </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => state;
export default App;

