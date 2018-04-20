import React, { Component } from 'react';
import $ from 'jquery'; 
//import './Calendar.css';
/* global gapi */
/* global initClient */
/* global updateSigninStatus */
/* global handleAuthClick */
/* global handleSignoutClick */
/* global handleAuthResult */
/* global appendPre */
/* global listUpcomingEvents */
/* global refreshICalendarframe */


class Calendar extends Component {

    constructor() {
        super();
        this.state = {
            API_KEY: 'AIzaSyCdC4elPM1IHb1Ct_sZw7D2XIC5tb8tmJo',
            CLIENT_ID: '594687122878-ke25lnr7a5qfivethln16ua4l21rl484.apps.googleusercontent.com',
            scopes: 'https://www.googleapis.com/auth/calendar',
        }
    }

    componentDidMount() {
        var today = new Date();

        today = today.toISOString();

        var twoHoursLater = new Date(today.getTime() + (2 * 1000 * 60 * 60));
        twoHoursLater = twoHoursLater.toISOString();

        // Client ID and API key from the Developer Console
        var CLIENT_ID = '594687122878-ke25lnr7a5qfivethln16ua4l21rl484.apps.googleusercontent.com';
        var API_KEY = 'AIzaSyCdC4elPM1IHb1Ct_sZw7D2XIC5tb8tmJo';

        // enter the scope of current project (this API must be turned on in the Google console)
        var scopes = 'https://www.googleapis.com/auth/calendar';

        var authorizeButton = document.getElementById('authorize-button');
        var signoutButton = document.getElementById('signout-button');

        var resource = {
            "summary": "My Event",
            "start": {
                "dateTime": today
            },
            "end": {
                "dateTime": twoHoursLater
            },
            "description": "We are organizing events",
            "location": "US",
            "attendees": [
                {
                    "email": "xyz@gmail.com",
                    "displayName": "Shaveta",
                    "organizer": true,
                    "self": false,
                    "resource": false,
                    "optional": false,
                    "responseStatus": "needsAction",
                    "comment": "This is event first",
                    "additionalGuests": 3

                },
                {
                    "email": "abc@gmail.com",
                    "displayName": "Chatak",
                    "organizer": true,
                    "self": false,
                    "resource": false,
                    "optional": false,
                    "responseStatus": "needsAction",
                    "comment": "This is office event",
                    "additionalGuests": 3
                }
            ],
        };
    }

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
    initClient() {
        gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            scope: this.scopes,
            immediate: true
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          this.authorizeButton.onclick = handleAuthClick;
          this.signoutButton.onclick = handleSignoutClick;
        });
    }

    // show/hide the 'authorize' button, depending on application state
    handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        var eventButton = document.getElementById('btnCreateEvents');
        var resultPanel = document.getElementById('result-panel');
        var resultTitle = document.getElementById('result-title');

        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        if (authResult && !authResult.error) {
            this.authorizeButton.style.visibility = 'hidden'; 		// if authorized, hide button
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            resultPanel.className = resultPanel.className.replace(/(?:^|\s)panel-danger(?!\S)/g, '')	// remove red class
            resultPanel.className += ' panel-success'; 			// add green class
            resultTitle.innerHTML = 'Application Authorized'		// display 'authorized' text
            eventButton.style.visibility = 'visible';
            $("#txtEventDetails").attr("visibility", "visible");
        } else {													// otherwise, show button
            this.authorizeButton.style.visibility = 'visible';
            $("#txtEventDetails").attr("visibility", "hidden");
            eventButton.style.visibility = 'hidden';
            resultPanel.className += ' panel-danger'; 			// make panel red
            this.authorizeButton.onclick = handleAuthClick; 			// setup function to handle button click
            this.signoutButton.onclick = handleSignoutClick;
        }
    }

    // function triggered when user authorizes app
    handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
        gapi.auth.authorize({ client_id: this.clientId, scope: this.scopes, immediate: false }, handleAuthResult);
        return false;
    }

    /**
  *  Sign out the user upon button click.
  */
    handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

    /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.authorizeButton.style.display = 'none';
            this.signoutButton.style.display = 'block';
            listUpcomingEvents();
        } else {
            this.authorizeButton.style.display = 'block';
            this.signoutButton.style.display = 'none';
        }
    }

    /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
    listUpcomingEvents() {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            /*'showDeleted': false,*/
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (response) {
            var events = response.result.items;
            appendPre('Upcoming events:');

            if (events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    appendPre(event.summary + ' (' + when + ')')
                }
            } else {
                appendPre('No upcoming events found.');
            }
        });
    }

    refreshICalendarframe() {
        var iframe = document.getElementById('divifm')
        iframe.innerHTML = iframe.innerHTML;
    }

    // function load the calendar api and make the api call
    makeApiCall() {
        var eventResponse = document.getElementById('event-response');

        gapi.client.load('calendar', 'v3', function () {	// load the calendar api (version 3)
            var request = gapi.client.calendar.events.insert
                ({
                    'calendarId': 'fk765birljiou3i7njv358n700@group.calendar.google.com', // calendar ID
                    "resource": this.resource	// pass event details with api call
                });

            // handle the response from our api call
            request.execute(function (resp) {
                if (resp.status == 'confirmed') {
                    eventResponse.innerHTML = "Event created successfully. View it <a href='" + resp.htmlLink + "'>online here</a>.";
                    eventResponse.className += ' panel-success';
                    refreshICalendarframe();
                } else {
                    document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
                    eventResponse.className += ' panel-danger';
                }
            });
        });
    }

    render() {
        return (
            <div className="calendar">
                <h1>HELLO DO YOU SEE ME</h1>

                <script src="https://apis.google.com/js/client.js?onload=handleClientLoad" type="text/javascript"></script>
                <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

                {/*<!-- Navigation -->*/}
                <nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">Google Calendar API</a>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li>
                                    <a href="#">Simple Way to embed you calendar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/*<!-- Page Content -->*/}
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-sm-2 col-xs-12">
                            <button id="authorize-button" style="visibility: hidden" class="btn btn-primary">
                                Authorize</button>
                        </div>
                        {/*<!-- .col -->*/}
                        <div class="col-md-10 col-sm-10 col-xs-12">
                            <div class="panel panel-danger" id="result-panel">
                                <div class="panel-heading">
                                    <h1>
                                        My Calendar</h1>
                                    <h3 class="panel-title" id="result-title">
                                        Ain't no calendar like MY CALENDAR</h3>
                                    &nbsp;
                    </div>
                            </div>

                            <button id="btnCreateEvents" class="btn btn-primary" onclick="makeApiCall();">
                                Create Events</button>

                            <div id="event-response">
                            </div>
                            <div id="divifm">
                                <iframe id="ifmCalendar" src="https://calendar.google.com/calendar/embed?src=fk765birljiou3i7njv358n700%40group.calendar.google.com&ctz=America%2FNew_York"
                                    style="border-width: 0" width="950" height="520" frameborder="0" scrolling="no">
                                </iframe>
                            </div>
                            <script async defer src="https://apis.google.com/js/api.js"
                                onload="this.onload=function(){};handleClientLoad()"
                                onreadystatechange="if (this.readyState === 'complete') this.onload()">
                            </script>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Calendar;