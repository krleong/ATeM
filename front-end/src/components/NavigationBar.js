import React from 'react';
import Button from './Button';
import NavigationTabs from '../components/NavigationTabs';
import { Link } from "react-router-dom";
import {FiLogOut, FiLogIn, FiUser, FiUserPlus} from 'react-icons/fi'

import './NavigationBar.css';

export default function NavigationBar(props) {
    const [username] = React.useState(localStorage.getItem('user')); 
    const [logged] = React.useState(localStorage.getItem('logged')); 

    const handleLogOut = () => {
        localStorage.removeItem('logged');
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
    }

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {logged ? 
                    <Link to="/feed"><img className="nav-logo" alt="logo" src="../assets/atem_logo_v2_blurple.png"/></Link>
                    :
                    <Link to="/home"><img className="nav-logo" alt="logo" src="../assets/atem_logo_v2_blurple.png"/></Link>
                }
                
                
                {/* CHANGE THIS FROM BEING HARD-CODED AND ALWAYS LOGGED IN */}
                <NavigationTabs></NavigationTabs>
                {logged ?
                    <div className="nav-button-container">
                        <div className="current-user"><FiUser className="icons" /><span id="current-user-name">{username}</span></div>
                        <Button onClick={handleLogOut} to="/login"><FiLogOut /><p>Log Out</p></Button>
                    </div>
                    
                    :
                    <div className="nav-button-container">
                         <Button to="/login"><FiLogIn /><p>Log In</p></Button>   
                         <Button buttonstyle="primary" to="/signup"><FiUserPlus /><p>Sign Up</p></Button> 
                     </div>
                }
            </div>
        </nav>  
    ); 
}