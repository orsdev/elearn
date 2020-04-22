import React from 'react';
import LoginButton from '../Button/loginButton/logInButton';

const Hero = (props) => {

 return (
  <div
   className="hero"
   data-test="hero-component">
   <div
    className="hero-body"
    data-test="hero-body">
    <h1>HONE YOUR SKILLS</h1>
    <p>
     Learn from professional intructors. It’s easy to learn a new skill, and even easier to get started.
     </p>
    <LoginButton text="Student Login" />
   </div>

  </div>
 )
};

export default Hero;