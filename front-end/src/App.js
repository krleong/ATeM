import React from 'react';
import './App.css';
// third party, found in package.json
import { Link, Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Feed from './pages/Feed'; // relative paths
import LogIn from './pages/LogIn';
import MakeTransaction from './pages/MakeTransaction';
//import Home from './Home'; // relative paths
import Home from './pages/Home'; // relative paths
import SignUp from './pages/SignUp'; // relative paths
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <ul id="debug-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/feed">Feed</Link></li>
          <li><Link to="/maketransaction">Make Transaction</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul> */}

        <Switch>
          {/* <Route path="/feed" component={Feed} /> */}
          <Route path="/login" component={LogIn}></Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/feed" component={Feed} />
          <ProtectedRoute path="/maketransaction" component={MakeTransaction} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/home" component={Home} />
          <Route path="/"><Redirect to="/home" /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
