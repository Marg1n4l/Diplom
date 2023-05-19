import React, { Component } from 'react'
import FinishedOrder from './FinishedOrder'

export class FinishedOrders extends Component {
  render() {
    return (
      <main>
        
        {this.props.userItems.map(el => (
            <FinishedOrder key={el.id} item={el}/>
        ))}
      </main>
    )
  }
}

export default FinishedOrders