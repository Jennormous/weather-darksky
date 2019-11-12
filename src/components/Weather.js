import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    return (
      <div className="weather-info">
        <p>Timezone: {this.props.timezone}</p>
        <p>Summary: {this.props.summary.currently.summary}</p>
        <p>Temperature: {this.props.temperature.currently.temperature}</p>
      </div>
    )
  }
}
