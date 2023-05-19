import React, { Component } from 'react'




export class Item extends Component {
  render() {
    return (
      <div className='item'>
        
        <img src={"./img/" + this.props.item.img} onClick={() => this.props.onShowInfo(this.props.item)} />
        <h2>{this.props.item.title}</h2>
        <b>{this.props.item.price}₴</b>
        <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>До кошику</div>
      </div>
    )
  }
}

export default Item