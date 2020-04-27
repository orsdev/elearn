import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../component/Header/header';
import Home from '../../component/Home/home';
import Dashboard from '../../component/Dashboard/dashboard';
import Footer from '../../component/Footer/footer';
import InstructorPage from '../../component/InstructorPage/instructorPage';



class Elearn extends Component {

 render() {

  let route = (
   <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/instructor" component={InstructorPage} />
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
