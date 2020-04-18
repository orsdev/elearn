import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import { Route, Switch } from 'react-router-dom';
import Header from '../../component/Header/header';
import Home from '../../component/Home/home';
import AllCourses from '../../component/AllCourses/allCourses';


class Elearn extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 //Google auth logout function
 logout = () => {
  this.props.onLogOutUser();
 }

 render() {

  let route = (
   <Switch>
    <Route exact path="/all-courses" component={AllCourses} />
    <Route exact path="/" component={Home} />
   </Switch>
  )
  return (
   <Fragment>
    <Header
     src={this.props.auth ? this.props.user.imageUrl : null}
     fullname={this.props.auth ? this.props.user.name : null}
     logout={this.logout}
     auth={this.props.auth} />
    {route}
   </Fragment >
  );
 }
}

const mapStateToProps = (state) => {
 return {
  auth: state.authenticate.auth,
  user: state.authenticate.user,
  id: state.playListId
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onLogOutUser: () => dispatch(action.logOutUser())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Elearn);
