export default class Tool {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.deleteEvents()
    }

    deleteEvents() {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
    }
}