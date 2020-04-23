import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../component/Header/header';
import Home from '../../component/Home/home';
import Footer from '../../component/Footer/footer';

class Elearn extends Component {

 render() {

  let route = (
   <Switch>
    <Route exact path="/" component={Home} />
   </Switch>
  )
  return (
   <Fragment>
    <Header />
    {route}
    <Footer />
   </Fragment >
  );
 }
}

export default Elearn;
