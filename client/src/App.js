import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Guest from './components/guest';
import Login from './components/login';
import AdminSystem from "./components/Asys";
import AdminUser from "./components/Auser";

function App() {
  return( 
    <Router>
      <Switch>
        <Route path= "/login">
          <Login/>
        </Route>
        <Route path="/Asystem">
          <AdminSystem/>
        </Route>
        <Route path="/userA">
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
