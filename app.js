const app = {
    init(formSelector) {
        document
          .querySelector(formSelector)
          .addEventListener('submit', this.addFlick)
    },

    addFlick(ev) {
        ev.preventDefault()
        console.log('submitted!')
    },
}

app.init('#flickForm')