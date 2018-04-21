import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import * as Calendar from './Calendar';
import './Calendar.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h3>Ain't no calendar like</h3>
            <h1>MY CALENDAR</h1>
            <NavLink className="Link" to={'/Calendar'}>ADD AN EVENT!</NavLink>
        </header>
        {/*<button id="authorize-button" style="display: none;">Authorize</button>*/}
        {/*<button id="signout-button" style="display: none;">Sign Out</button>*/}
        <Switch>
          <Route path='/Calendar' component={Calendar} />
        </Switch>
      </div>
    );
  }
}

export default App;
