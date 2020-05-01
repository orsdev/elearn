import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = (props) => {
 return (
  <div className="nomatch">
   <div className="nomatch-body">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <div className="nomatch-navlinks">
     <Link to="/"> Student Home  </Link>
     <Link to="/instructor"> Instructor Home  </Link>
    </div>
   </div>
  </div>
 )
};

export default NoMatch;
