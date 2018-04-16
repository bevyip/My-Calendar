const app = {
    init(taskSelector) {
        this.max = 0
        document
          .querySelector(taskSelector)
          .addEventListener('submit', this.addTask.bind(this))
    },

    addTask(ev) {
        ev.preventDefault()
        const store = ev.target
        const task = {
            id: this.max + 1,
            name: store.userTask.value,
        }
        console.log(task.name, task.id)
        ++ this.max
        //const userTask = ev.target.userTask.value
        //console.log(userTask)
    },
}

app.init('#taskForm')