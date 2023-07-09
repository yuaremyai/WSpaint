import Tool from "./Tool";

export default class Circle extends Tool {
    MouseDown: boolean
    startX!: number
    startY!: number
    saved!: string;

    constructor(canvas:HTMLCanvasElement){
        super(canvas)
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
        this.ctx?.moveTo(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
        this.saved = this.canvas.toDataURL()
    }
    mouseUpHandler(e: MouseEvent) {
        this.MouseDown = false
    }
    mouseMoveHandler(e: MouseEvent) {
        if(this.MouseDown) {
            let currentX: number = e.pageX - this.canvas.offsetLeft
            let currentY: number = e.pageY - this.canvas.offsetTop
            let centerX: number = (currentX + this.startX) / 2
            let centerY: number = (currentY + this.startY) / 2
            let radiusX: number = Math.abs((currentX - this.startX) / 2) 
            let radiusY: number = Math.abs((currentY - this.startY) / 2) 
            this.draw(centerX, centerY, radiusX, radiusY )
        }
    }

    draw(x:number, y:number, rx:number, ry:number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI)
            this.ctx?.fill()
            this.ctx?.stroke()
        }

    }
}