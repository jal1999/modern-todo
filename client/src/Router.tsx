import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginOrSignup from './pages/LoginOrSignup';
import { useCookies } from 'react-cookie';
import Todo from "./features/todo/components/Todo";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log("here are the cookies: ", cookies);

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
      <Route exact path="/todo-lists/:todoListId">
        {cookies["isLoggedIn"] ? <Todo /> : <LoginOrSignup type='signup' />}
      </Route>
    </Switch>
  )
}

export default App;
