import { useEffect, useRef, useState } from 'react'
import "../styles/canvas.scss"
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import sessionState from '../store/sessionState'
import toolState from '../store/toolState'

import Brush from "../tools/Brush"
import Modal from './Modal'
import { useParams } from 'react-router-dom';
import { drawHandler } from '../handlers/drawHandler'


function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [modal, setModal] = useState(true)
  const params = useParams()

  useEffect(() => {
    if (canvasRef.current){
      canvasState.setCanvas(canvasRef.current)
    }
  }, [])

  useEffect( () => {
    if (sessionState.username && params.id) {
      const socket = new WebSocket('ws://localhost:5000/')
      toolState.setTool(new Brush(canvasState.canvas, socket, params.id))

      sessionState.setSessionID(params.id)
      sessionState.setSocket(socket)
      socket.onopen = function() {
        socket.send(JSON.stringify({
          id: params.id, 
          method:"connection", 
          username: sessionState.username}))
      }
  
      socket.onmessage = function(event) {
        let msg = JSON.parse(event.data)
        switch(msg.method){
          case 'connection':
            // alert(`User ${msg.username} connected`)
            break
          
          case 'draw':
            drawHandler(msg)
            break
        }
      }
    }
    
  }, [sessionState.username])

  function MouseDownHandler() {
    canvasState.pushToUndo(canvasRef.current!.toDataURL())
    canvasState.clearRedo()
  }

  return (
    <div className='canvas'>
      <Modal modal={modal} setModal={setModal}></Modal>
      <canvas onMouseDown={MouseDownHandler} ref={canvasRef} width={'600px'} height={'400px'}></canvas>
    </div>
  )
}

export default observer(Canvas)