import React, { Component } from 'react';
import './AddEvent.css'
// import { makeApiCall } from './Calendar';

class AddEvent extends Component {

    constructor(props) {
        super(props);

    }

    createClose() {
        //PROBLEM AREA for close not appending for each li item
        var myNodelist = document.getElementsByTagName("LI");
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);

        }
    }

    hideClose() {
        var hideclose = document.getElementsByClassName("close");
        var j;
        for (j = 0; j < hideclose.length; j++) {
            hideclose[j].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }

    createCheck() {
        var list = document.querySelector('ul');
        list.addEventListener('click', function (ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);
    }


    newElement() {
        var li = document.createElement("li");
        var inputValue = document.getElementById("myInput").value;

        /* I NEED THE VALUES FROM TIME AND DATE TOO */ 
        //makeApiCall(inputValue);
<<<<<<< HEAD
=======
        //trying to store date and time below:
        //day month and year are separate
        //////////////
        var inputDay = document.getElementById("selectDay").value;
        var inputMonth = document.getElementById("selectMonth").value;
        var inputYear = document.getElementById("selectYear").value;
        var inputTime = document.getElementById("selectTime").value;

        var varday = document.createTextNode(inputDay);
        var varmonth = document.createTextNode(inputMonth);
        var varyear = document.createTextNode(inputYear);
        var vartime = document.createTextNode(inputTime);
        /////////////
>>>>>>> 3623ccf15b9047517155729a9310b0f2e0ea5849

        var t = document.createTextNode(inputValue);
        li.appendChild(t);

        ////////////
        li.appendChild (document.createTextNode("  --  "));
        li.appendChild(varmonth);
        li.appendChild (document.createTextNode("  --  "));
        li.appendChild(varday);
        li.appendChild (document.createTextNode("  --  "));
        li.appendChild(varyear);
        li.appendChild (document.createTextNode("  --  "));
        li.appendChild(vartime);

        if (inputDay === '') {
            alert("Day Field Empty!");
        }
        if (inputMonth === '') {
            alert("Month Field Empty!");
        }
        if (inputYear === '') {
            alert("Year Field Empty!");
        }
        if (inputTime === '') {
            alert("Time Field Empty!");
        }
        ////////////

        if (inputValue === '') {
            alert("Event Field Empty!");
        }
        document.getElementById("myUL").appendChild(li);
        document.getElementById("myInput").value = " ";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        var close = document.getElementsByClassName("close");
        var k;
        for (k = 0; k < close.length; k++) {
            close[k].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }

    render() {
        return (
            <div>

                <div className="AddEvent"></div>


                {/*<head>*/}
                <link href="./style.css" type="text/css" rel="stylesheet" />

                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>My Calendar</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/*</head>*/}

                {/*<body>*/}

                    <div className="row">
                        <div className="medium-8 column"></div>
                        
                        <h2><center>Select Date:</center></h2>
                        <form id="date-form">
                            <center>
                                <select name="Month" id="selectMonth" >
                                    <option value="month">Month</option>
                                    <option value="january">January</option>
                                    <option value="february">February</option>
                                    <option value="march">March</option>
                                    <option value="april">April</option>
                                    <option value="may">May</option>
                                    <option value="june">June</option>
                                    <option value="july">July</option>
                                    <option value="august">August</option>
                                    <option value="september">September</option>
                                    <option value="october">October</option>
                                    <option value="november">November</option>
                                    <option value="december">December</option>
                                </select>


                                <input id="selectDay" placeholder="Day" type="number" name="day" min="1" max="31" />
                                <select name="Year" id="selectYear">
                                    <option value="year">Year</option>
                                    <option value="2018">2018</option>
                                </select>
                            </center>
                        </form>



                        <h2><center>Select Time:</center></h2>
                        <form id="time-form">
                            <center>
                                <input type="time" id="selectTime" name="time" />
                            </center>
                        </form>


                        <div id="myDIV" className="header">
                            <h2><center>Events:</center></h2>
                            <center>
                                <form id="inForm">
                                    <input className="inputBox" type="text" id="myInput" placeholder="Add New Event" />
                                </form></center>
                            <button
                              onClick={(e) => this.newElement(e)}
                                //onClick= "newElement()"
                                className="addBtn"
                                type="submit"
                                styles="float: right"
                            >Add</button>
                        </div>

                        <ul id="myUL" className="ul-todo">
                        </ul>
                    

                </div>


                <script src="app.js"></script>
                <script src="https://apis.google.com/js/api.js"></script>

                {/*</body>*/}
            </div>


        );

    }
}

export default AddEvent;