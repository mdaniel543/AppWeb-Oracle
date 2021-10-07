import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Guest from './components/guest';
import Login from './components/login';
import Form from './components/Aform';

function App() {
  return( 
    <Router>
      <Switch>
        <Route path= "/login">
          <Login/>
        </Route>
        <Route path= "/form">
          <Form/>
        </Route>
        <Route path="/">
          <Guest/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
