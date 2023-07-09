import { useEffect, useRef } from 'react'
import "../styles/canvas.scss"
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import Brush from "../tools/Brush"
import toolState from '../store/toolState'



function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (canvasRef.current){
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current))
    }
  }, [])
  

  return (
    <div className='canvas'>
      <canvas ref={canvasRef} width={'600px'} height={'400px'}></canvas>
    </div>
  )
}

export default observer(Canvas)