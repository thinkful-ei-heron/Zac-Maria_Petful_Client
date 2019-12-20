import React from 'react';

import { Route, withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import Adoption from '../Adoption/Adoption';

import './App.css';

export default withRouter(class App extends React.Component {
  state = {
    error: null
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Route
          exact path='/'
          component={LandingPage}
        />
        <Route
          path='/adoption'
          component={Adoption}
        />
      </div>
    );
  }
})
