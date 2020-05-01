import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../component/Header/header';
import Home from '../../component/Home/home';
import Dashboard from '../../component/Dashboard/dashboard';
import Footer from '../../component/Footer/footer';
import InstructorPage from '../../component/InstructorPage/instructorPage';
import FavouriteCourses from '../../component/FavouriteCourses/favouriteCourses';
import NoMatch from '../../component/NoMatch/noMatch';



class Elearn extends Component {

 render() {

  let route = (
   <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/instructor" component={InstructorPage} />
    <Route exact path="/favourite" component={FavouriteCourses} />
    <Route component={NoMatch} />
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
