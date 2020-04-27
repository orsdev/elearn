import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../../store/action';
import BannerBg from '../../assets/img/banner.jpg';

const Banner = (props) => {

 const logOutUser = () => {
  props.onLogOutUser()
 }

 return (
  <div
   data-test="banner-component"
   className="banner">
   <img src={BannerBg} alt="Banner Background" className="banner-bg" />
   <div className="banner-overlay">&nbsp;</div>
   <Link
    onClick={logOutUser}
    to="/instructor">
    Become an Instructor
    </Link>
  </div>
 )
}

const mapDispatchToProps = (dispatch) => {
 return {
  onLogOutUser: () => dispatch(action.logOutUser())
 }
}

Banner.propTypes = {
 onLogOutUser: PropTypes.func
};


export default connect(null, mapDispatchToProps)(Banner);