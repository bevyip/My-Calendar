const app = {
    init(taskSelector) {
        document
          .querySelector(taskSelector)
          .addEventListener('submit', this.addTask)
    },

    addTask(ev) {
        ev.preventDefault()
        const taskName = ev.target.taskName.value
        console.log(taskName)
    },
}

app.init('#taskForm')