import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Calendar from './Calendar';
import AddEvent from './AddEvent';
import Authorize from './Authorize';
// import { isAuthorized } from './Authorize';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.authorizationCheck = this.authorizationCheck.bind(this);
    this.state = {
      auth: false
    }
  }

  authorizationCheck(isAuth) {
    console.log(isAuth);
    this.setState({auth: isAuth});
  }

  render() {

    let addEventLink = null;
    let viewCalendarLink = null;
    // console.log("ISAUTH: "+isAuthorized());
    console.log(this.state.auth);
    if (this.state.auth) {
      addEventLink = <NavLink className="Link" to={'/addEvent'}>Add An Event</NavLink>;
      viewCalendarLink = <NavLink className="CalLink" to={'/viewCalendar'}>View Calendar</NavLink>
    }
    // else {
    //   viewCalendarLink = <NavLink className="Link" to={'/addEvent'}>Add An Event</NavLink>;
    //   addEventLink = <NavLink className="CalLink" to={'/viewCalendar'}>View Calendar</NavLink>
    // }

    return (
      <div className="App">
        <div id="AppHeader" className="App-header">
            <h3>Ain't no calendar like</h3>
            <h1>MY CALENDAR</h1>
            <ul>
              <li>
                  {addEventLink}
                  {/*<NavLink className="Link" to={'/addEvent'}>Add An Event</NavLink>*/}
              </li>
              <li>
                  {viewCalendarLink}
                {/*<NavLink className="CalLink" to={'/viewCalendar'}>View Calendar</NavLink>*/}
              </li>
            </ul>
            <Authorize authCheck={this.authorizationCheck}/>
        </div>

        <Switch>
          {/*<Route exact path='/' component={Authorize} />*/}
          <Route path='/viewCalendar' component={Calendar} />
          <Route path='/addEvent' component={AddEvent} />
        </Switch>
      </div>
    );
  }
}

export default App;
