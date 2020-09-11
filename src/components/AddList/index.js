import React, {useState} from 'react'
import List from '../List'

import './AddList.scss'
import Badge from '../Badge'
import closeSvg from '../../assets/img/close.svg'

const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Enter Name List')
            return
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name
        onAdd({id: Math.random(), name: inputValue, color})
        onClose()
    }

    return (
        <>
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>,
                        name: 'Add Task List'
                    }
                ]}
            />
            {visiblePopup
            && <div className='add-list__popup'>
                <img
                    onClick={onClose}
                    src={closeSvg}
                    alt='close'
                    className='add-list__popup-close-btn'/>

                <input
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    className='field'
                    type='text'
                    placeholder='Name Task'/>

                <div className='add-list__popup-colors'>
                    {
                        colors.map(color => <Badge
                            onClick={() => selectColor(color.id)}
                            className={selectedColor === color.id && 'active'}
                            key={color.id}
                            color={color.name}/>)
                    }
                </div>
                <button
                    onClick={addList}
                    className='button'
                >Add Task
                </button>
            </div>
            }
        </>
    )
}

export default AddList