export default class Boat {
    constructor(config = {}) {
        this.x = config.x || 0
        this.y = config.y || 0
        this.angle = config.angle || 0

        this.length = config.length || 100
        this.beam = config.beam || 30
        this.bulge = config.bulge || 10

        this.fillStyle = config.fillStyle || 'white'
        this.strokeStyle = config.strokeStyle || 'black'
    }

    draw(ctx) {
        const pathStart = {
            x: -this.length/2,
            y: -this.beam/2
        }

        ctx.save()

        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle

        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        ctx.beginPath()
        ctx.moveTo(pathStart.x, pathStart.y)
        ctx.quadraticCurveTo(
            pathStart.x + 3*this.length/4, pathStart.y - this.bulge,
            pathStart.x + this.length, pathStart.y + this.beam / 2
        )
        ctx.quadraticCurveTo(
            pathStart.x + 3*this.length/4, pathStart.y + this.beam + this.bulge,
            pathStart.x, pathStart.y + this.beam
        )
        ctx.closePath()

        ctx.fill()
        ctx.stroke()

        ctx.restore()
    }
}