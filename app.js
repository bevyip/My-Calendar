const app = {
    init(selectors) {
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
          .querySelector(selectors.taskSelector)
          .addEventListener('submit', this.addTask.bind(this))
    },

    addTask(ev) {
        ev.preventDefault()
        const store = ev.target
        const task = {
            // stores input and assigns id
            id: this.max + 1,
            name: store.userTask.value,
            
        }
        
        const listItem = this.renderListItem(task)
        const listType = this.listItemBox(task)
        // adds the task to the list
         //this.list.appendChild(listItem)
         // this.list.appendChild(listType)
        
       //  this.list.insertBefore(listType, listItem)
       this.list.appendChild(listType) + this.list.appendChild(listItem)
        ++ this.max
        //reset line
        store.reset()

        // this.list.appendTo(listItem)
        //listType.appendTo(listItem)
    },

    renderListItem(task) { /*
        const item = document.createElement('li')
        item.textContent = task.name */
        const item = document.createElement('li') 
        //item.setAttribute('type', 'li');
        item.id = "itemid"
        // item.insertBefore(listItem, listType);
        item.textContent = task.name;
        return item
    },

    listItemBox(task) {
        const box = document.createElement('input');
        box.setAttribute('type', 'checkbox');
        return box
    },
}

app.init({
    taskSelector: '#task-form',
    listSelector: '#task-list'})

    function validate(){
        var m = document.getElementById('selectMonth').value;

    if(m == "january" || m == "march" || m == "may" || m == "july" || m == "august" || m == "october" || m == "december") {
        //document.getElementById('selectDay').setAttribute('max', '5');
        document.getElementById('selectDay').innerHTML = "<input id=\"selectDay\" placeholder=\"Day\" type=\"number\" name=\"day\" min=\"1\" max=\"2\">";
    } else if(m == "april" || m == "june" || m == "september" || m == "november") {

    } else if(m == "february") {

    }
}