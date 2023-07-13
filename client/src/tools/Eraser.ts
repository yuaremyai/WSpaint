import Tool from "./Tool";

export default class Eraser extends Tool {
    MouseDown: boolean


    constructor(canvas:HTMLCanvasElement, socket:WebSocket, sessionID: string){
        super(canvas, socket, sessionID)
        this.listen()
        this.MouseDown = false

    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e: MouseEvent) {
        this.MouseDown = true
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }

    mouseUpHandler(e: MouseEvent) {
        this.MouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionID,
            figure: {
                type: 'finish',
            }
        }))
    }
    
    mouseMoveHandler(e: MouseEvent) {
        if(this.MouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionID,
                figure: {
                    type: 'eraser',
                    x: e.pageX - this.canvas.offsetLeft,
                    y: e.pageY - this.canvas.offsetTop,
                    lineWidth: this.ctx.lineWidth,
                }
            }))
        }
    }

    static draw(ctx:CanvasRenderingContext2D, x:number, y:number, width: number) {
        const tmpColor = ctx.strokeStyle
        const tmpWidth = ctx.lineWidth

        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = width
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.strokeStyle = tmpColor
        ctx.lineWidth = tmpWidth
    }

}