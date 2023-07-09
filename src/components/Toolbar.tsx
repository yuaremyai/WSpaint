import 'react'
import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import toolState from '../store/toolState'
import canvasState from '../store/canvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'

function Toolbar() {

  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas!))}></button>
      <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas!))}></button>
      <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas!))}></button>
      <button className='toolbar__btn eraser'></button>
      <button className='toolbar__btn line'></button>
      <input  className='toolbar__input' type='color'/>
      <button className='toolbar__btn undo'></button>
      <button className='toolbar__btn redo'></button>
      <button className='toolbar__btn save'></button>

    </div>
  )
}

export default Toolbar