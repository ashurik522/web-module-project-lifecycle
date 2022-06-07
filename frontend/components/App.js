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

    axios.post(URL, newItem)
      .then(res=>{
        console.log(res)
        this.setState({
          toDos: [...this.state.toDos, res.data.data]
        })
      })
      .catch(err => console.error(err))

    
  }

  // {...item, completed: !item.completed}

  toggleItem = (itemId) => {
    axios.patch(`http://localhost:9000/api/todos/${itemId}`)
      .then(res=>{
        console.log(res.data)
        this.setState({
          ...this.state.toDos,
          toDos: this.state.toDos.map(item => {
            if(itemId === item.id){
              return res.data.data
            }
            return item;
          })
        })
      })
      .catch(err => console.error(err))
  }

  toggleHideCompleted = () => {
    this.setState({
      ...this.state,
      hideCompleted: !this.state.hideCompleted,
      status: !this.state.status
    })
  }

  completeTodo(){

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