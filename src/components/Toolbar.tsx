import React from 'react'
import '../styles/toolbar.scss'

function Toolbar() {
  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush'></button>
      <button className='toolbar__btn rect'></button>
      <button className='toolbar__btn circle'></button>
      <button className='toolbar__btn eraser'></button>
      <button className='toolbar__btn line'></button>
      <input  className='toolbar__input' type='color'/>
      <button className='toolbar__btn undo'></button>
      <button className='toolbar__btn redo'></button>
    </div>
  )
}

export default Toolbar