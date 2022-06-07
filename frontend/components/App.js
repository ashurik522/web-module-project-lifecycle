import React from 'react'
import TodoList from './TodoList';
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'



export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      toDos: [], 
      text: "",
      hideCompleted: false
    }
  }

  componentDidMount(){
    axios.get(URL)
      .then(res => {
        console.log(res)
        this.setState({
          toDos: res.data.data
        })
      })
      .catch(err => console.error(err))
  }

  addItem = (item) => {
    const newItem = {
      name: item,
      id: Date.now(),
      completed: false
    }

    this.setState({
      toDos: [...this.state.toDos, newItem]
    })
  }

  toggleItem = (itemId) => {
    this.setState({
      ...this.state,
      toDos: this.state.toDos.map(item => {
        if(itemId === item.id){
          return {...item, completed: !item.completed}
        }
        return item;
      })
    })
  }

  toggleHideCompleted = () => {
    this.setState({
      ...this.state,
      hideCompleted: !this.state.hideCompleted,
      status: !this.state.status
    })
  }



  render() {
    const { status } = this.state

    return (
      <div className='App'>
        <div className='header'>
          <h2>Todos:</h2>
        </div>
        <TodoList 
          toDos={this.state.toDos}
          toggleItem={this.toggleItem}
          hideCompleted={this.state.hideCompleted}
        />
        <Form addItem={this.addItem}/>
        <button 
          onClick={this.toggleHideCompleted}>
          {`${status ? 'Show Completed' : 'Hide Completed'}`}
        </button>
      </div>
    )
  }
}