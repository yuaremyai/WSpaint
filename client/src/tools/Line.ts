import Tool from "./Tool";

export default class Line extends Tool {
    MouseDown: boolean
    startX!: number
    startY!: number
    saved!: string;
    currentX!: number
    currentY!: number

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
        this.startX = e.pageX - this.canvas.offsetLeft
        this.startY = e.pageY - this.canvas.offsetTop
        this.ctx.moveTo(this.startX, this.startY)
        this.saved = this.canvas.toDataURL()
    }


    mouseUpHandler(e: MouseEvent) {
        this.MouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionID,
            figure: {
                type: 'line',
                x: e.pageX - this.canvas.offsetLeft,
                y: e.pageY - this.canvas.offsetTop,
                startx: this.startX,
                starty: this.startY,
                lineWidth: this.ctx.lineWidth,
                lineColor: this.ctx.strokeStyle
            }
        }))
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.MouseDown) {
            this.currentX = e.pageX - this.canvas.offsetLeft
            this.currentY = e.pageY - this.canvas.offsetTop
            this.draw(this.currentX, this.currentY)
        }
    }

    draw(x:number, y:number,) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }

    }

    static staticDraw(ctx:CanvasRenderingContext2D, x:number, y:number, startx:number, starty:number, color: string, width: number) {
        const tmpWidth = ctx.lineWidth
        const tmpColor = ctx.strokeStyle
        
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(startx, starty)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.lineWidth = tmpWidth
        ctx.strokeStyle = tmpColor
    }
}