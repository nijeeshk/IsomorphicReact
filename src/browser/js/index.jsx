import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
// import AppContainer from './components/widgets/AppContainer';
import App from './components/App';
import '../assets/stylesheets/style.scss';

render(
  <Router>
    {/* <AppContainer> */}
      <App />
    {/* </AppContainer> */}
  </Router>, document.getElementById('app')
);
