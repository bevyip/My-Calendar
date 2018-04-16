const app = {
    init(taskSelector) {
        document
          .querySelector(taskSelector)
          .addEventListener('submit', this.addTask)
    },

    addTask(ev) {
        ev.preventDefault()
        const store = ev.target
        const task = {
            name: store.userTask.value,
        }
        console.log(task.name)
        //const userTask = ev.target.userTask.value
        //console.log(userTask)
    },
}

app.init('#taskForm')