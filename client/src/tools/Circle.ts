import Tool from "./Tool";

export default class Circle extends Tool {
    MouseDown: boolean;
    startX!: number;
    startY!: number;
    saved!: string;
    radius!: number;

    constructor(canvas:HTMLCanvasElement, socket:WebSocket, sessionID: string){
        super(canvas, socket, sessionID)
        this.listen();
        this.MouseDown = false;
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseDownHandler(e: MouseEvent) {
        this.MouseDown = true;
        this.startX = e.pageX - this.canvas.offsetLeft;
        this.startY = e.pageY - this.canvas.offsetTop;
        this.ctx.moveTo(this.startX, this.startY)
        this.saved = this.canvas.toDataURL();
    }

    mouseUpHandler(e: MouseEvent) {
        this.MouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionID,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                r: this.radius,
                fillColor: this.ctx.fillStyle
            }
        }))
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.MouseDown) {
            let currentX: number = e.pageX - this.canvas.offsetLeft;
            let currentY: number = e.pageY - this.canvas.offsetTop;
            this.radius = Math.sqrt(
                (currentX - this.startX) ** 2 + (currentY - this.startY) ** 2
            );
            this.draw(this.startX, this.startY, this.radius);
        }
    }

    draw(x: number, y: number, r: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
        };
    }

    static StaticDraw(ctx:CanvasRenderingContext2D, x:number, y:number, r:number, color: string) {
        const tmpColor = ctx.fillStyle
        
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fill()

        ctx.fillStyle = tmpColor
    }
}
