import Boat from './boat.js'
import DirectionInput from './directionInput.js'
import Slider from './slider.js'

export default class Overworld {
    constructor(config) {
        this.element = config.element
        this.rudderSlider = new Slider({
            element: this.element.querySelector('#rudder'),
            map: {right: 'increase', left: 'decrease'},
        })
        this.throttleSlider = new Slider({
            element: this.element.querySelector('#throttle'),
            map: {up: 'increase', down: 'decrease'},
        })
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.gameObjects = []
        this.time = performance.now()
        this.directionInput = new DirectionInput()
    }

    init() {
        this.directionInput.init()
        const boat = new Boat({x: 100, y: 60})
        this.gameObjects.push(this.rudderSlider)
        this.gameObjects.push(this.throttleSlider)
        this.gameObjects.push(boat)
        this.startGameLoop()
    }

    startGameLoop() {
        const step = (deltaTime) => {
            this.drawBackground()
            for (const gameObject of this.gameObjects) {
                gameObject.update(deltaTime, {
                    arrow: this.directionInput.direction,
                    rudder: this.rudderSlider.value,
                    throttle: this.throttleSlider.value,
                })
                gameObject.draw(this.ctx)
            }
            requestAnimationFrame(now => {
                step(now - this.time)
                this.time = now
            })
        }
        step(0)
    }

    drawBackground() {
        this.ctx.fillStyle = "dodgerblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}