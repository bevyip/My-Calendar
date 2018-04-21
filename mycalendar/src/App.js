import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Calendar from './Calendar'
import './bootstrap.min.css';
import './Calendar.css';
import './jquery.js';
import './bootstrap.min.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h3>Ain't no calendar like</h3>
            <h1>My Calendar</h1>
        </header>
        <ul className="nav-links">
          <li>
            <NavLink to={'/calendar'}>CALENDAR</NavLink>  
          </li>
        </ul>
        <button id="authorize-button" style="display: none;">Authorize</button>
        <button id="signout-button" style="display: none;">Sign Out</button>
        <Switch>
          <Route path='/calendar' component={Calendar} />
        </Switch>
      </div>
    );
  }
}

export default App;
