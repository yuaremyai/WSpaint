import Tool from "./Tool";

export default class Brush extends Tool {
    MouseDown: boolean


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
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }
    mouseUpHandler(e: MouseEvent) {
        this.MouseDown = false
        
    }
    mouseMoveHandler(e: MouseEvent) {
        if(this.MouseDown) {
            this.draw(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
        }
    }

    draw(x:number, y:number) {
        this.ctx?.lineTo(x, y)
        this.ctx?.stroke()
    }

}