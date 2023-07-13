import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas!: HTMLCanvasElement
    redoList: string[] = []
    undoList: string[] = []


    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
    }

    pushToRedo(data: string) {
        this.redoList.push(data)
    }
    
    clearRedo() {
        this.redoList = []
    }

    undo() {
        const dataUrl = this.undoList.pop()
        let ctx = this.canvas.getContext('2d')!
        
        if (dataUrl) {
            this.pushToRedo(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        else { 
            ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d')!
        const dataUrl = this.redoList.pop()
        
        if (dataUrl) {
            this.pushToUndo(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()