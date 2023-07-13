export default class Tool {
    canvas: HTMLCanvasElement
    socket: WebSocket
    sessionID: string
    ctx!: CanvasRenderingContext2D

    constructor (canvas: HTMLCanvasElement, socket:WebSocket, sessionID: string) {
        this.canvas = canvas
        this.socket = socket
        this.sessionID = sessionID
        this.ctx = canvas.getContext('2d')!
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
    }
}