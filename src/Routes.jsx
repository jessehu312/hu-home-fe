import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Register from "./components/Register";
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import { UserProvider, useCurrentUser } from './context/UserProvider';

const CheckRegister = (props) => {
  const { currentUser } = useCurrentUser();
  return currentUser.family ? <Main {...props}/> : <Register currentUser={currentUser.me} {...props}/>;
  
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FirebaseAuthConsumer>
            {({ isSignedIn, ...values }) => isSignedIn ? <UserProvider><CheckRegister {...values} /></UserProvider> : <Login />}
          </FirebaseAuthConsumer>
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;