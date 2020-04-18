import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header/header';
import Home from '../../component/Home/home';


class Elearn extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 render() {
  return (
   <Fragment>
    <Header
     src={this.props.auth ? this.props.user.imageUrl : null}
     fullname={this.props.auth ? this.props.user.name : null}
     logout={this.logout}
     auth={this.props.auth} />
    <Home />
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

export default connect(mapStateToProps, null)(Elearn);
