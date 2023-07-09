import 'react'
import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import toolState from '../store/toolState'
import canvasState from '../store/canvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Ellipse from '../tools/Ellipse'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'

function Toolbar() {

  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas!))} />
      <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas!))} />
      <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas!))} />
      <button className='toolbar__btn ellipse' onClick={() => toolState.setTool(new Ellipse(canvasState.canvas!))} />
      <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas!))}/>
      <button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas!))}/>
      <input  className='toolbar__input' type='color' onChange={(e) => toolState.setFillColor(e.target.value)}/>
      <button className='toolbar__btn undo' />
      <button className='toolbar__btn redo' />
      <button className='toolbar__btn save' />

    </div>
  )
}

export default Toolbar