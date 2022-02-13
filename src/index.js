import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/*this is for redux*/}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
