export default class Tool {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.deleteEvents()
    }

    set fillColor(color:string) {
        if (this.ctx) {
            this.ctx.fillStyle = color
        }
    }

    set strokeColor(color:string) {
        if (this.ctx) {
            this.ctx.strokeStyle = color
        }
    }

    set lineWidth(width:number) {
        if (this.ctx) {
            this.ctx.lineWidth = width
        }
    }

    deleteEvents() {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
        this.canvas.onmouseout = null

    }
}