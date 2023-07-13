interface Message{
    id: string,
    method: string,
    figure: FigBrush | FigRect | FigCircle | FigEllipse | FigEraser | FigLine |FigFinish
}

interface FigBrush {
    type: 'brush'
    x: number
    y: number
    lineWidth: number
    lineColor: string
}

interface FigRect {
    type: 'rect'
    x: number
    y: number
    width: number
    height: number
    fillColor: string
}

interface FigCircle {
    type: 'circle'
    x: number
    y: number
    r: number
    fillColor: string
}

interface FigEllipse {
    type: 'ellipse'
    x: number
    y: number
    rx: number
    ry: number
    fillColor: string
}

interface FigEraser {
    type: 'eraser'
    x: number
    y: number
    lineWidth: number
}

interface FigLine{
    type: 'line'
    x: number
    y: number
    startx: number
    starty: number
    lineWidth: number
    lineColor: string
}

interface FigFinish {
    type: 'finish'
}