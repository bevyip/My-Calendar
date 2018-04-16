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
            id: this.max + 1,
            name: store.userTask.value,
        }

        const listItem = this.renderListItem(task)
        //console.log(listItem)
        //console.log(task.name, task.id)
        this.list.appendChild(listItem)
        ++ this.max
        //const userTask = ev.target.userTask.value
        //console.log(userTask)
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