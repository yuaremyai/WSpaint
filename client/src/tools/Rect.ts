import Tool from "./Tool";

export default class Rect extends Tool {
    MouseDown: boolean
    startX!: number
    startY!: number
    saved!: string;
    width!: number
    height!: number

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
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                fillColor: this.ctx.fillStyle
            }
        }))
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.MouseDown) {
            let currentX: number = e.pageX - this.canvas.offsetLeft
            let currentY: number = e.pageY - this.canvas.offsetTop
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x:number, y:number, w:number, h:number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
        }

    }

    static StaticDraw(ctx:CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color: string) {
        const tmpColor = ctx.fillStyle
        
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()

        ctx.fillStyle = tmpColor
    }
}