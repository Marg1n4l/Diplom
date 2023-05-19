import React, { Component } from 'react'

export class FinishedOrder extends Component {
  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.img}/>
        <h2>{this.props.item.title}</h2>
        <b>{this.props.item.price}₴</b>
      </div>
    )
  }
}

export default FinishedOrder