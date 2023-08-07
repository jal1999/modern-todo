import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginOrSignup from './pages/LoginOrSignup';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setIsLoggedIn, removeIsLoggedIn] = useCookies(["isLoggedIn"]);

  return (
    <Switch>
      <Route exact path='/'>
        {cookies["isLoggedIn"] ? <Home /> : <Redirect to="/login"/>}
      </Route>
      <Route exact path="/login">
        {cookies["isLoggedIn"] ? <Redirect to='/' /> : <LoginOrSignup type='login' />}
      </Route>
      <Route exact path="/sign-up">
        {cookies["isLoggedIn"] ? <Redirect to='/'/> : <LoginOrSignup type='signup' />}
      </Route>
    </Switch>
  )
}

export default App;
