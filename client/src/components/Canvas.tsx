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

  useEffect( () => {
    const socket = new WebSocket('ws://localhost:5000/')
    socket.onopen = function() {
      socket.send(JSON.stringify({id:5555}))
    }

    socket.onmessage = function(msg) {
      console.log(msg.data)
    }
  }, [])
  
  function MouseDownHandler() {
    canvasState.pushToUndo(canvasRef.current!.toDataURL())
    canvasState.clearRedo()
  }

  return (
    <div className='canvas'>
      <canvas onMouseDown={MouseDownHandler} ref={canvasRef} width={'600px'} height={'400px'}></canvas>
    </div>
  )
}

export default observer(Canvas)