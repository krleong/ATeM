import React from 'react';
import { Link, useHistory, NavLink } from "react-router-dom";
import { FiHome, FiLayout, FiGrid } from 'react-icons/fi';
import './NavigationTabs.css';

export default function NavigationTabs(props) {
    const currentRoute = useHistory().location.pathname.toLowerCase();
    const [logged] = React.useState(localStorage.getItem('logged'));
    const [userid] = React.useState(localStorage.getItem('userid')); 

    return (
        /* Logged in ? True : False */
        /* Home, Dashboard, Feed : Home, Feed */
        <div>
            {logged ?
                <div className="tab-container">
                    <ul id="tabs">
                        {/* <Link className={currentRoute.includes("home") ? "tab active" : "tab"} active to="/home"><FiHome className="icons" /><p>Home</p></Link> */}
                        <NavLink activeClassName="active" className={"feed"} to="/feed"><FiGrid className="icons" /><p>Feed</p></NavLink>
                        <Link className={currentRoute.includes("dashboard") ? "tab active" : "tab"} to="/dashboard"><FiLayout className="icons" /><p>Dashboard</p></Link>
                    </ul>
                </div>
                :
                <div className="tab-container">
                    <ul id="tabs">
                        <Link className={currentRoute.includes("home") ? "tab active" : "tab"} to="/home"><FiHome className="icons" /><p>Home</p></Link>
                        <NavLink activeClassName="active" className={"feed"} to="/feed"><FiGrid className="icons" /><p>Feed</p></NavLink>
                    </ul>
                </div>
            }
        </div>
    );
}