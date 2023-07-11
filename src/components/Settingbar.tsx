import React, { ChangeEvent} from 'react'
import toolState from '../store/toolState'
import '../styles/settingbar.scss'

function Settingbar() {

  function handleWidthInput(e: ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) > 50) {
      toolState.setStrokeWidth(50)
      return
    }
    toolState.setStrokeWidth(Number(e.target.value))
    
  }

  return (
    <div className='settingbar'>
      <label htmlFor='width'>Line width: </label>
      <input  className='settingbar__width' id='width' type='number' min={1} max={50} onChange={handleWidthInput} />
      <label htmlFor='color'>Line color: </label>
      <input  className='settingbar__color' id='color' type='color'  onChange={(e) => toolState.setStrokeColor(e.target.value)}/>
    </div>
  )
}

export default Settingbar