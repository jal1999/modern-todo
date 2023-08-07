import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginOrSignup from './pages/LoginOrSignup';
import GoogleOAuth from './features/authentication/google/components/GoogleOAuth';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        {localStorage.getItem("token") ? <Home /> : <Redirect to="/login"/>}
      </Route>
      <Route exact path="/login">
        {localStorage.getItem('token') ? <Redirect to='/' /> : <LoginOrSignup type='login' />}
      </Route>
      <Route exact path="/sign-up">
        {localStorage.getItem('token') ? <Redirect to='/'/> : <LoginOrSignup type='signup' />}
      </Route>
    </Switch>
  )
}

export default App;
