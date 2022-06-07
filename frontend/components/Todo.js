import React from 'react'

const Todo = props => {
  
    return (
      <div onClick={()=> props.toggleItem(props.item.id)} className='todo'>
        {props.item.name} {props.item.completed && '✓'}
      </div>
    )
}

export default Todo;