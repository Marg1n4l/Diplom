import React, { Component } from 'react'

export class Categories extends Component {
    constructor(props) {
        super(props)
        this.state ={
            categories: [
                {
                    key: 'all',
                    name: 'Усі'
                },
                {
                    key: 'puzzle',
                    name: 'Головоломки'
                },
                {
                    key: 'board-games',
                    name: 'Настільні ігри'
                }
                
            ]
        }
    }
  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el => (
            <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
        ))}
      </div>
    )
  }
}

export default Categories