import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
 
  
  render() {
    
    return (
      <div className='todo-list'>
        {this.props.toDos.map(item=> {
          if(this.props.hideCompleted){
            if(this.props.hideCompleted === !item.completed){
              return <Todo toggleItem={this.props.toggleItem} key={item.id} item={item}/>
            } 
          } else {
            return <Todo toggleItem={this.props.toggleItem} key={item.id} item={item}/>
          }
          })}
      </div>
    )
  }
}
