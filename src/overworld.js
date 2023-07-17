import Boat from './boat.js'

export default class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.gameObjects = []
        this.time = performance.now()
    }

    init() {
        const boat = new Boat({x: 100, y: 60})
        this.gameObjects.push(boat)
        this.startGameLoop()
    }

    startGameLoop() {
        const step = (deltaTime) => {
            this.drawBackground()
            for (const gameObject of this.gameObjects) {
                gameObject.update(deltaTime, {})
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