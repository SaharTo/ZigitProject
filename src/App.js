import './App.css';
import Login from './login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Info from './info';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {sessionStorage.getItem('token') && <Route path="/info" component={Info} />}
          {//!sessionStorage.getItem('token') && 
            <Route path="/" component={Login} />
          }
        </Switch>
      </div>
    </Router>

  );
}

export default App;
