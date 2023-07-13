import canvasState from "../store/canvasState"
import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Ellipse from "../tools/Ellipse"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"


export function drawHandler(msg: Message) {
    const ctx = canvasState.canvas.getContext("2d")!
    switch(msg.figure.type){
        case 'brush':
            Brush.draw(ctx, msg.figure.x, msg.figure.y, msg.figure.lineWidth, msg.figure.lineColor)
            break
      
        case 'rect':
            Rect.StaticDraw(ctx, msg.figure.x, msg.figure.y, msg.figure.width, msg.figure.height, msg.figure.fillColor)
            ctx.beginPath()
            break
        
        case 'circle':
            Circle.StaticDraw(ctx, msg.figure.x, msg.figure.y, msg.figure.r, msg.figure.fillColor)
            ctx.beginPath()
            break

        case 'ellipse':
            Ellipse.StaticDraw(ctx, msg.figure.x, msg.figure.y, msg.figure.rx, msg.figure.ry, msg.figure.fillColor)
            ctx.beginPath()
            break
        
        case 'eraser':
            Eraser.draw(ctx, msg.figure.x, msg.figure.y, msg.figure.lineWidth)
            break
        
        case 'line':
            Line.staticDraw(ctx, msg.figure.x, msg.figure.y, msg.figure.startx, msg.figure.starty, msg.figure.lineColor, msg.figure.lineWidth)
            ctx.beginPath()
            break

        case 'finish':
            ctx.beginPath()
            break
    }
    
  }