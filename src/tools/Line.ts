import Tool from "./Tool";

export default class Line extends Tool {
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
        this.canvas.onmouseout = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler(e: MouseEvent) {
        this.MouseDown = true
        this.startX = e.pageX - this.canvas.offsetLeft
        this.startY = e.pageY - this.canvas.offsetTop
        this.ctx?.moveTo(this.startX, this.startY)
        this.saved = this.canvas.toDataURL()
    }


    mouseUpHandler(e: MouseEvent) {
        this.MouseDown = false
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.MouseDown) {
            let currentX: number = e.pageX - this.canvas.offsetLeft
            let currentY: number = e.pageY - this.canvas.offsetTop
            this.draw(currentX, currentY)
        }
    }

    draw(x:number, y:number,) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.moveTo(this.startX, this.startY)
            this.ctx?.lineTo(x, y)
            this.ctx?.stroke()
        }

    }
}