import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Calendar from './Calendar';
import AddEvent from './AddEvent';
import './Calendar.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h3>Ain't no calendar like</h3>
            <h1>MY CALENDAR</h1>
            <NavLink className="Link" to={'/AddEvent'}>ADD AN EVENT!</NavLink>
        </header>
        {/*<button id="authorize-button" style="display: none;">Authorize</button>*/}
        {/*<button id="signout-button" style="display: none;">Sign Out</button>*/}
       
        <div className="Calendar">
            {/*<p>HELLO DO YOU SEE ME I'm in App.js</p>*/}
            <Calendar />

          </div>

        <Switch>
          <Route path='/AddEvent' component={AddEvent} />
        </Switch>
      </div>
    );
  }
}

export default App;
