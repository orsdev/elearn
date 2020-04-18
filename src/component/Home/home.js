import React, { Fragment } from 'react';
import * as action from '../../store/action';
import { connect } from 'react-redux';
import Hero from '../Hero/hero';
import HomeCourses from '../HomeCourses/homeCourses';

const Home = (props) => {

 //Google auth success function
 const responseGoogle = (response) => {
  if (response && !response.error) {
   props.onLogInUser(response.profileObj, true);
  }
 };

 return (
  <Fragment>
   <Hero
    responseGoogle={responseGoogle}
    auth={props.auth} />
   <HomeCourses />
  </Fragment>
 )
};

const mapStateToProps = (state) => {
 return {
  auth: state.authenticate.auth,
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onLogInUser: (user, auth) => dispatch(action.logInUser(user, auth))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
