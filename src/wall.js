export default class Wall {
    constructor(points) {
        this.points = points
    }

    init() {
        //noop
    }

    update() {
        //noop
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        ctx.lineTo(this.points[1].x, this.points[1].y)
        ctx.lineTo(this.points[2].x, this.points[2].y)
        ctx.lineTo(this.points[3].x, this.points[3].y)
        ctx.closePath()
        ctx.stroke()
    }
}