import {render} from 'react-dom'
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        strong cli App
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
