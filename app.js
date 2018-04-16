const app = {
    init(taskSelector) {
        document
          .querySelector(taskSelector)
          .addEventListener('submit', this.addTask)
    },

    addTask(ev) {
        ev.preventDefault()
        const userTask = ev.target.userTask.value
        console.log(userTask)
    },
}

app.init('#taskForm')