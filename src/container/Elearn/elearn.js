import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import Header from '../../component/Header/header';
import Hero from '../../component/Hero/hero';
import Courses from '../../component/Courses/courses';


class Elearn extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 //Google auth success function
 responseGoogle = (response) => {
  if (response && !response.error) {
   this.props.onLogInUser(response.profileObj, true);
  }
 };

 //Google auth logout function
 logout = () => {
  this.props.onLogOutUser();
 }

 render() {
  return (
   <Fragment>
    <Header
     src={this.props.auth ? this.props.user.imageUrl : null}
     fullname={this.props.auth ? this.props.user.name : null}
     logout={this.logout}
     auth={this.props.auth} />
    <Hero
     responseGoogle={this.responseGoogle}
     auth={this.props.auth}
    />
    <Courses />
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
  onLogInUser: (user, auth) => dispatch(action.logInUser(user, auth)),
  onLogOutUser: () => dispatch(action.logOutUser())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Elearn);
