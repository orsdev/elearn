import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
    <Header
     src={this.props.loggedIn ? this.props.userData.imageUrl : null}
     fullname={this.props.loggedIn ? this.props.userData.name : null}
     loggedIn={this.props.loggedIn} />
    {route}
    <Footer />
   </Fragment >
  );
 }
}

const mapStateToProps = (state) => {
 return {
  loggedIn: state.authenticate.loggedIn,
  userData: state.authenticate.userData,
  id: state.playListId
 }
};

export default connect(mapStateToProps, null)(Elearn);
