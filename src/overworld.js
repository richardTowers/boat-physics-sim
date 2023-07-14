import Boat from './boat.js'

export default class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    init() {
        this.ctx.fillStyle = "dodgerblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const boat = new Boat({
            x: 100,
            y: 60,
            angle: Math.PI / 4
        })
        boat.draw(this.ctx)
    }

}