import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Guest from './components/guest';
import Login from './components/login';
import AdminSystem from "./components/AdminSystem";
import AdminUser from "./components/AdminUser";

function App() {
  return( 
    <Router>
      <Switch>
        <Route path= "/login">
          <Login/>
        </Route>
        <Route path="/AdminSystem">
          <AdminSystem/>
        </Route>
        <Route path="/AdminUser">
          <AdminUser/>
        </Route>
        <Route path="/">
          <Guest/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
