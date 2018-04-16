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
        // adds the task to the list
        this.list.appendChild(listItem)
        ++ this.max
        //reset line
        store.reset()
        
    },

    renderListItem(task) {
        const item = document.createElement('li')
        item.textContent = task.name
        return item
    },
}

app.init({
    taskSelector: '#task-form',
    listSelector: '#task-list'})