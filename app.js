const app = {
    init(taskSelector) {
        document
          .querySelector(taskSelector)
          .addEventListener('submit', this.addTask)
    },

    addTask(ev) {
        ev.preventDefault()
        console.log('submitted!')
    },
}

app.init('#taskForm')