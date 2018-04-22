import React, { Component } from 'react';
import "./AddEvent.css"

class AddEvent extends Component {

constructor(props) {
    super(props);

}

createClose() {
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for(i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

hideClose() {
    var close = document.getElementsByClassName("close");
    var i;
    for(i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

createCheck() {
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        if(ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}


newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue === '') {
        alert("Task Field Empty!");
    }
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = " ";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    var close = document.getElementsByClassName("close");
    var i;
    for(i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}





render(){
    return(
        <div>
            <h1>HELLO DO YOU SEE ME</h1>
            <div className="AddEvent">
            </div>
        </div>
    );
    }
}

export default AddEvent;