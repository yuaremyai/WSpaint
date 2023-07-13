import React, {useRef} from 'react'
import "../styles/modal.scss"
import sessionState from '../store/sessionState'

interface Props{
    modal: boolean
    setModal: (value: boolean) => void
}

function Modal({modal, setModal}:Props) {
    const inputRef = useRef<HTMLInputElement>(null)

    function handleClick(e: React.MouseEvent) {
        if (inputRef.current) {
            e.preventDefault()
            setModal(false)
            sessionState.setUsername(inputRef.current.value)
        }
    }

    if(!modal) {
        return (<></>)
    }

    return (
        <div className='modal'>
            <div className='modal__window'>
                <p className='modal__text'>Enter username </p>
                <input ref={inputRef} className='modal__input' type='text' autoFocus/>
                <button className='modal__btn' onClick={handleClick}>Submit</button>
            </div>
        </div>
  )
}

export default Modal