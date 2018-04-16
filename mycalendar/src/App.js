import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Calendar from './Calendar'
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
        <Switch>
          <Route path='/calendar' component={Calendar} />
        </Switch>
      </div>
    );
  }
}

export default App;
