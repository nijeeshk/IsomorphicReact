import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import ImageCropper from './pages/ImageCropper';
import Test1 from './pages/test1';

export default () => (
  <div className="app">
    <div className="header fixed d-flex justify-content-end">
      <div className="links">
        <Link to="/">Image cropper</Link>
        <Link to="/test1">Test1</Link>
      </div>
    </div>
    <div className="page-wrap" style={{ paddingTop: '70px' }}>
      <div className="container">
        <Switch>
          <Route path="/" exact component={ImageCropper} />
          <Route path="/test1" component={Test1} />
        </Switch>
      </div>
    </div>
  </div>
);
