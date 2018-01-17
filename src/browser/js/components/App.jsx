import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Test from './pages/test';
import Test1 from './pages/test1';

export default () => (
  <div className="page-wrap">
    <div><Link to="/test">Test</Link></div>
    <div><Link to="/test1">Test1</Link></div>
    <Switch>
      <Route path="/test" component={Test} />
      <Route path="/test1" component={Test1} />
    </Switch>
  </div>
);
