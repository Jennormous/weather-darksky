import React, { Component } from "react";
import Headers from "./Headers";

export default class Forms extends Component {
  render() {
    return (
      <div>
        <Headers />
        <form className="form" onSubmit={this.props.location}>
          <input text="text" name="city" placeholder="Type city..."></input>
          <input
            text="text"
            name="country"
            placeholder="Type country..."
          ></input>
          <button id="submit">Get Weather</button>
        </form>
      </div>
    );
  }
}
