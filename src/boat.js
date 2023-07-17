import isBoatColliding from "./collision-detector.js"

export default class Boat {
    constructor(config = {}) {
        this.x = config.x || 0
        this.y = config.y || 0
        this.angle = config.angle || 0
        this.speed = 0

        this.length = config.length || 40
        this.beam = config.beam || 12
        this.bulge = config.bulge || 4

        this.fillStyle = config.fillStyle || 'white'
        this.strokeStyle = config.strokeStyle || 'black'
        this.isColliding = false
    }

    updatePoints() {
        const cos = Math.cos(this.angle)
        const sin = Math.sin(this.angle)

        const halfLength = this.length / 2;
        const halfBeam = this.beam / 2;

        const x1 = this.x + halfLength * cos - halfBeam * sin
        const y1 = this.y + halfLength * sin + halfBeam * cos

        const x2 = this.x - halfLength * cos - halfBeam * sin
        const y2 = this.y - halfLength * sin + halfBeam * cos

        const x3 = this.x - halfLength * cos + halfBeam * sin
        const y3 = this.y - halfLength * sin - halfBeam * cos

        const x4 = this.x + halfLength * cos + halfBeam * sin
        const y4 = this.y + halfLength * sin - halfBeam * cos

        this.points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: x3, y: y3 },
            { x: x4, y: y4 }
        ]
    }

    update(deltaTime, event) {
        const angleChangePerMilisecond = 1 / 60_000
        const movementPerMilisecond = 200 / 60_000

        if (this.isColliding) {
            // Stop the boat as soon as there's a collision
            this.speed = 0
        }
        else {
            this.speed = event.throttle // TODO - inertia
        }

        this.x += this.speed * deltaTime * Math.cos(this.angle) * movementPerMilisecond
        this.y += this.speed * deltaTime * Math.sin(this.angle) * movementPerMilisecond

        this.angle += this.speed / 10 * event.rudder * deltaTime * angleChangePerMilisecond * 2 * Math.PI

        this.updatePoints()
        this.isColliding = isBoatColliding(this.points, event.walls.map(x => x.points))
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

        this.drawCollisionBox(ctx)
    }

    drawCollisionBox(ctx) {
        ctx.save()
        ctx.strokeStyle = this.isColliding ? 'orange' : 'blue'
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        ctx.lineTo(this.points[1].x, this.points[1].y)
        ctx.lineTo(this.points[2].x, this.points[2].y)
        ctx.lineTo(this.points[3].x, this.points[3].y)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
    }
}