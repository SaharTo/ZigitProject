import './App.css';
import Login from './cmp/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Info } from './cmp/Info';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useSelector } from "react-redux";


function App() {
  const { user } = useSelector((state) =>
    state.login
  )
  return (
    <Router>
      <div className="App">
        <Provider store={store}> {/*this is for redux*/}
          <Switch>
            {user && user[0].token && <Route path="/info" component={Info} />}
            <Route path="/" component={Login} />
          </Switch>
        </Provider>
      </div>
    </Router>

  );
}
export default App;
