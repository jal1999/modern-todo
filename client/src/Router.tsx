import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import GoogleOAuth from './components/oauth/GoogleOAuth';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        {localStorage.getItem("token") ? <Home /> : <Redirect to="/login"/>}
      </Route>
      <Route exact path="/login">
        {localStorage.getItem('token') ? <Redirect to='/' /> : <AuthForm type='login' />}
      </Route>
      <Route exact path="/sign-up">
        {localStorage.getItem('token') ? <Redirect to='/'/> : <AuthForm type='signup' />}
      </Route>
    </Switch>
  )
}

export default App;
