import React, { Component } from 'react';
import './Authorize.css'

//var CLIENT_ID = '594687122878-ke25lnr7a5qfivethln16ua4l21rl484.apps.googleusercontent.com';
var CLIENT_ID = '997562130279-lugpm3kl09blkdsicmefuuqpimqumode.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";
var CALENDAR_ID = 'fk765birljiou3i7njv358n700@group.calendar.google.com';
var API_KEY = 'AIzaSyAmSbS7UTAJB4Ul_eGaBokAVUz2sgDJ5Bs';

// For making gapi object passed as props to our component
const mapScriptToProps = state => ({
    // gapi will be this.props.gapi
    gapi: {
        globalPath: 'gapi',
        url: DISCOVERY_DOCS,
    }
});

class Authorize extends Component {
    // define a state variable named 'events' as an array
    constructor(props) {
        super(props);
        // this.state = {
        this.events = [];
        this.gapi = null;
        this.authorized = false;
        this.loadAuth = this.loadAuth.bind(this);
        this.handleAuthResult = this.handleAuthResult.bind(this);
        this.appendPre = this.appendPre.bind(this);
        this.handleAuthClick = this.handleAuthClick.bind(this);
        // }
    }

    /*
    * Checks if Authorized button has been clicked
    */

    isAuthorized(){
        //console.log(this.auth);
        this.props.isAuthorized(this.auth);
    }
    
    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        var MainC = document.getElementById('MainC');
        
        //console.log("AUTH RESULT: "+authResult);
        if (authResult && !authResult.error && this.authorized) {
            // Hide auth UI, then load client library.
            //console.log("this.props.authCheck: "+this.props.authCheck);
            this.props.authCheck(true);
            authorizeDiv.style.display = 'none';
            MainC.style.display = 'block';
            //this.gapi.load('client', start);
            //this.gapi.client.load('calendar', 'v3', listUpcomingEvents);
            this.loadAuth();
        } else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            authorizeDiv.style.display = 'inline';
            MainC.style.display = 'none';
        }
    }

    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    handleAuthClick(event) {
        // event.preventDefault();
        this.authorized = true;
        console.log(this);
        this.gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false,
        }, this.handleAuthResult);
        return false;
    }

    componentDidMount = () => {
        // Check is gapi loaded?
        if (this.props.gapi !== null) {
            this.loadAuth();
            var moment = require('moment');
            moment().format();
        }
    }

    componentWillReceiveProps({ gapi }) {
        if (this.props.gapi !== null) {
            this.loadAuth();
        }
    }

    // make call to Google Calendar API and update the state with response
    loadAuth() {
        this.gapi = window.gapi;
        let that = this;
        function start() {
            that.gapi.client.init({
                'apiKey': API_KEY
            }).then(function () {
                return that.gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
                })
            })
        }
        // The function gapi.load is used to load gapi libraries.
        // First one for libraries and second one is a callback function
        // which can be triggered once the requested libraries are loaded.

        that.gapi.load('client', start)
    }

    /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
    appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    render() {
        const { events } = this.events;
        // console.log(events);
        let eventsList = this.events.map(function (event) {
            return (
                <a
                    className="list-group-item"
                    href={event.htmlLink}
                    target="_blank"
                    key={event.id}
                >
                </a>
            );
        });

        return (
            <div id="divifm">

                <div id="authorize-div" styles="display: none">
                    <span className="AuthorizeTitle">Authorize access to Google Calendar API</span>
                    {/*Button for the user to click to initiate auth sequence*/}
                    <div id="AuthButton">
                        <button id="authorize-button" onClick={(e) => this.handleAuthClick(e)}>
                            Authorize
                        </button>
                    </div>
                </div>
                <div id="MainC">
                    <iframe id="ifmCalendar"
                        src="https://calendar.google.com/calendar/embed?src=fk765birljiou3i7njv358n700%40group.calendar.google.com&ctz=America%2FNew_York"
                        styles="border-width: 0"
                        width="1000"
                        height="600"
                        frameBorder="0"
                        scrolling="no">
                    </iframe>
                </div>
            </div>
        );
    }
}

export default Authorize;