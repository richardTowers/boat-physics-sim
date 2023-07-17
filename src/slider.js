export default class Slider {
    constructor(config) {
        this.element = config.element
        this.value = parseInt(this.element.value, 10)
        this.map = config.map 
    }

    init() {

    }

    update(deltaTime, event) {
        const elementValue = parseInt(this.element.value, 10)
        // If the user has moved the slider, that should take priority over any key presses
        if (this.value !== elementValue) {
            this.value = elementValue
            return
        }

        const action = this.map[event.arrow]
        switch(action) {
            case 'increase':
                this.value += 1
                this.element.value = this.value
                break
            case 'decrease':
                this.value -= 1
                this.element.value = this.value
                break
        }
    }

    draw() {
        // noop
    }
}