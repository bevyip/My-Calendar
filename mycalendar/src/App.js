import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Calendar from './Calendar';
import AddEvent from './AddEvent';
import Authorize from './Authorize';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <h3>Ain't no calendar like</h3>
            <h1>MY CALENDAR</h1>
            <ul>
              <li>
                <NavLink className="Link" to={'/addEvent'}>Add An Event</NavLink>
              </li>
              <li>
                <NavLink className="CalLink" to={'/viewCalendar'}>View Calendar</NavLink>
              </li>

            </ul>
        </div>

        <Switch>
          <Route exact path='/' component={Authorize} />
          <Route path='/viewCalendar' component={Calendar} />
          <Route path='/addEvent' component={AddEvent} />
        </Switch>
      </div>
    );
  }
}

export default App;
