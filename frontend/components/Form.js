import React from 'react'

export default class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      itemText: ""
    }
  }

  handleChange = e => {
    this.setState({ itemText: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addItem(this.state.itemText)
    this.setState({
      itemText: ""
    })
  }

  render() {
    return (
      <div className='formContainer'>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="item"
            onChange={this.handleChange}
            value={this.state.itemText}
          />
          <button>Add</button>
        </form>
      </div>
    )
  }
}