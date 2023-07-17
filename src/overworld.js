import Boat from './boat.js'
import DirectionInput from './directionInput.js'
import Slider from './slider.js'
import eastCowesMarinaCollisionMap from './east-cowes-marina-collision-map.js'
import Wall from './wall.js'

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
        this.boat = null
        this.walls = []
        this.ctx = this.canvas.getContext('2d')
        this.gameObjects = []
        this.time = performance.now()
        this.directionInput = new DirectionInput()
        this.backgroundImage = new Image(576, 360)
    }

    init() {
        this.directionInput.init()
        this.backgroundImage.src = '/images/east-cowes-marina.png'
        this.walls = eastCowesMarinaCollisionMap.map(x => new Wall(x))
        this.boat = new Boat({x: 70, y: 60, angle: 0.45 * Math.PI })
        this.gameObjects.push(this.rudderSlider)
        this.gameObjects.push(this.throttleSlider)
        this.gameObjects.push(this.boat)
        this.walls.forEach(wall => this.gameObjects.push(wall))

        this.backgroundImage.onload = () => {
            this.startGameLoop()
        }
    }

    startGameLoop() {
        const step = (deltaTime) => {
            this.drawBackground()
            for (const gameObject of this.gameObjects) {
                gameObject.update(deltaTime, {
                    arrow: this.directionInput.direction,
                    rudder: this.rudderSlider.value,
                    throttle: this.throttleSlider.value,
                    walls: this.walls,
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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.backgroundImage.width, this.backgroundImage.height)
    }

}