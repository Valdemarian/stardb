import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ( {onServiceChange, toggleRandomPlanet} ) => {
  return (
    <div className="header d-flex">
      <Link to="/"><h3>StarDB</h3></Link>
      <ul className="d-flex">

        <Link to="/people/"><li>People</li></Link>
        
        <Link to="/planets/"><li>Planets</li></Link>
        
        <Link to="/starships/"><li>Starships</li></Link>

        <Link to="/login"><li>Login</li></Link>

        <Link to="/secret"><li>Secret</li></Link>
        
        <li className="border-none">
         <button 
            className="btn btn-primary btn-sm"
            onClick={onServiceChange}>
          Change Service
         </button>
        </li>
        <li className="border-none">
        <button 
            className="btn btn-primary btn-sm" 
            onClick={toggleRandomPlanet}>
          Toggle random Planet
        </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;