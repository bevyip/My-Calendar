import React, { Component } from 'react';
import moment from "moment";

var CLIENT_ID = '594687122878-ke25lnr7a5qfivethln16ua4l21rl484.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";
var CALENDAR_ID = 'fk765birljiou3i7njv358n700@group.calendar.google.com';
var API_KEY = 'AIzaSyCdC4elPM1IHb1Ct_sZw7D2XIC5tb8tmJo';

class Calendar extends Component {
    // define a state variable named 'events' as an array
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount = () => {
        this.getEvents();
        var moment = require('moment');
        moment().format();
        console.log(window.gapi);
    }

    // make call to Google Calendar API and update the state with response
    getEvents() {
        let that = this;
        function start() {
            window.gapi.client.init({
                'apiKey': this.API_KEY
            }).then(function () {
                return window.gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${this.CALENDAR_ID}/events`,
                })
            }).then((response) => {
                // Once the request promise is resolved we will get the list of events as response. 
                // Then we will call setState method of React to store data to the app state.
                let events = response.result.items
                that.setState({ events }, () => {
                    console.log(that.state.events);
                })
            }, function (reason) {
                console.log(reason);
            });
        }
        // The function gapi.load is used to load gapi libraries.
        // First one for libraries and second one is a callback function
        // which can be triggered once the requested libraries are loaded.
       
        //window.gapi.load('client', start)
    }

    render() {
        const { time, events } = this.state;

        let eventsList = events.map(function (event) {
            return (
                <a
                    className="list-group-item"
                    href={event.htmlLink}
                    target="_blank"
                    key={event.id}
                >
                    {event.summary}{" "}
                    <span className="badge">
                        {moment(event.start.dateTime).format("h:mm a")},{" "}
                        {moment(event.end.dateTime).diff(
                            moment(event.start.dateTime),
                            "minutes"
                        )}{" "}
                        minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
                    </span>
                </a>
            );
        });

        return (
            <div id="divifm">
                {/*<p>HELLO I'M IN CALENDAR.JS</p>*/}
                <iframe id="ifmCalendar"
                    src="https://calendar.google.com/calendar/embed?src=fk765birljiou3i7njv358n700%40group.calendar.google.com&ctz=America%2FNew_York"
                    styles="border-width: 0"
                    width="1000"
                    height="600"
                    frameborder="0"
                    scrolling="no">
                </iframe>
            </div>
        );
    }
}   

export default Calendar;