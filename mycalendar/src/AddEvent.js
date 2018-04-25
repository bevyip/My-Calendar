import React, { Component } from 'react';
import './AddEvent.css'
// import { makeApiCall } from './Calendar';
import { makeApiCall } from './Calendar';

class AddEvent extends Component {

    constructor(props) {
        super(props);

    }

    createClose() {
        //PROBLEM AREA??? for close not appending for each li item
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

        //storing date, time, input
        var inputValue = document.getElementById("myInput").value;
        var inputDay = document.getElementById("selectDay").value;
        var inputMonth = document.getElementById("selectMonth").value;
        var inputYear = document.getElementById("selectYear").value;
        var inputTime = document.getElementById("selectTime").value;
        var inputEndTime = document.getElementById("selectEndTime").value;
        var exportMonth;

        if (inputMonth === "January") {
            exportMonth = 1;
        }
        else if (inputMonth === "February"){
            exportMonth = 2;
        }
        else if (inputMonth === "March"){
            exportMonth = 3;
        }
        else if (inputMonth === "April"){
            exportMonth = 4;
        }
        else if (inputMonth === "May"){
            exportMonth = 5;
        }
        else if (inputMonth === "June"){
            exportMonth = 6;
        }
        else if (inputMonth === "July"){
            exportMonth = 7;
        }
        else if (inputMonth === "August"){
            exportMonth = 8;
        }
        else if (inputMonth === "September"){
            exportMonth = 9;
        }
        else if (inputMonth === "October"){
            exportMonth = 10;
        }
        else if (inputMonth === "November"){
            exportMonth = 11;
        }
        else{ //December
            exportMonth = 12;
        }


        

        var varday = document.createTextNode(inputDay);
        var varmonth = document.createTextNode(inputMonth);
        var varyear = document.createTextNode(inputYear);
        var vartime = document.createTextNode(inputTime);
        var varendtime = document.createTextNode(inputEndTime);
        var t = document.createTextNode(inputValue);

        var data = [
            inputValue, inputDay, exportMonth, inputYear, inputTime, inputEndTime
        ];
    
        //calling function in Calendar.js
        makeApiCall(data);

        //appending all inputs into event list
        li.appendChild(t);
        li.appendChild (document.createTextNode("    on    "));
        li.appendChild(varmonth);
        li.appendChild (document.createTextNode("    "));
        li.appendChild(varday);
        li.appendChild (document.createTextNode("    "));
        li.appendChild(varyear);
        li.appendChild (document.createTextNode("    from    "));
        li.appendChild(vartime);
        li.appendChild (document.createTextNode("    to    "));
        li.appendChild(varendtime);

        //getting rid of exponential characters in Day
        var inputBox = document.getElementById("selectDay");
        var invalidChars = [
        "-",
        "+",
        "e",
        ];
        inputBox.addEventListener("input", function() {
            this.value = this.value.replace(/[e\+\-]/gi, "");
          });

        //boundaries for day
        if(inputDay > 31) {
            alert("Day Field Cannot Exceed 31!");
            document.getElementById("selectDay").value = '';
            return;
        }
        
        //empty field for date, time, input --> alert
        if (inputDay === '') {
            alert("Day Field Empty!");
            return;
        }
        if (inputMonth === 'month') {
            alert("Month Field Empty!");
            return;
        }
        if (inputYear === 'year') {
            alert("Year Field Empty!");
            return;
        }
        if (inputTime === '') {
            alert("Start Time Field Empty!");
            return;
        }
        if (inputEndTime === '') {
            alert("End Time Field Empty!");
            return;
        }

        if (inputValue === '') {
            alert("Event Field Empty!");
            return;
        }
       
        document.getElementById("myUL").appendChild(li);

        //clearing fields after appending to list
        document.getElementById("selectDay").value = '';
        document.getElementById("selectMonth").value = 'month';
        document.getElementById("selectYear").value = 'year';
        document.getElementById("selectTime").value = '';
        document.getElementById("selectEndTime").value = '';
        document.getElementById("myInput").value = " ";

        //close
        var span2 = document.createElement("SPAN");
        var txt2 = document.createTextNode("\u00D7");
        span2.className = "close";
        span2.appendChild(txt2);
        li.appendChild(span2); //Appending to list here???

        

        var close2 = document.getElementsByClassName("close");
        var k;
        for (k = 0; k < close2.length; k++) {
            close2[k].onclick = function () {
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
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>


                                <input type="number" id="selectDay" placeholder="Day" name="day" min="1" max="31" /> 
                                <select name="Year" id="selectYear">
                                    <option value="year">Year</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                </select>
                            </center>
                        </form>



                        <h2><center>Select Start Time:</center></h2>
                        <form id="time-form">
                            <center>
                                <input type="time" id="selectTime" name="time" />
                            </center>
                        </form>

                        <h2><center>Select End Time:</center></h2>
                        <form id="time-form">
                            <center>
                                <input type="time" id="selectEndTime" name="time" />
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

                        <div id="listDIV" className="listEvents">
                            <ul id="myUL" className="ul-todo">
                            </ul>
                        </div>
                    

                </div>


                <script src="app.js"></script>
                <script src="https://apis.google.com/js/api.js"></script>

                {/*</body>*/}
            </div>


        );

    }
}

export default AddEvent;