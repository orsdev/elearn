import React, { Fragment } from 'react';
import Hero from '../Hero/hero';
import HomeCourses from '../HomeCourses/homeCourses';
import Banner from '../Banner/banner';

const Home = (props) => {

 return (
  <Fragment>
   <Hero />
   <HomeCourses />
   <Banner />
  </Fragment>
 )
};

export default Home;
