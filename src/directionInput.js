export default class DirectionInput {
    constructor() {
        this.heldDirections = []
        // Support for arrow keys, hjkl, and wasd for movement
        this.map = {
            ArrowUp: 'up',
            KeyK: 'up',
            KeyW: 'up',

            ArrowRight: 'right',
            KeyL: 'right',
            KeyD: 'right',

            ArrowDown: 'down',
            KeyJ: 'down',
            KeyS: 'down',

            ArrowLeft: 'left',
            KeyH: 'left',
            KeyA: 'left',
        }
    }

    get direction() {
        return this.heldDirections[0]
    }

    init() {
        document.addEventListener('keydown', e => {
            const direction = this.map[e.code]
            if (direction && this.heldDirections.indexOf(direction) === -1) {
                this.heldDirections.unshift(direction)
            }
        })

        document.addEventListener('keyup', e => {
            const direction = this.map[e.code]
            const index = this.heldDirections.indexOf(direction)
            if (index > -1) {
                this.heldDirections.splice(index, 1)
            }
        })
    }
}