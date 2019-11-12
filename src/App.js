import React, { Component } from "react";
import axios from "axios";
import Forms from "./components/Forms";
import Weather from "./components/Weather";

const corsURL = "https://cors-anywhere.herokuapp.com/";

const locationURL = (city, country) =>
  `https://api.opencagedata.com/geocode/v1/json?key=5101b711284845e4b187302d9718f202&q=${city}%2C${country}&pretty=1`;
const weatherURL = (lat, lng) =>
  `${corsURL}https://api.darksky.net/forecast/8fbf79d142c32ccee589ac63ebebb9ad/${lat},${lng}?units=ca`;

export default class App extends Component {
  state = {
    city: "Vancouver",
    country: "Canada",
    weatherData: {},
    timezone: undefined,
    summary: undefined,
    temperature: undefined,
    loading: true
  };

  componentDidMount() {
    axios.get(locationURL(this.state.city, this.state.country)).then(res => {
      const geometry = res.data.results[0].geometry;
      console.log(res.data);
      axios.get(weatherURL(geometry.lat, geometry.lng)).then(res => {
        console.log(res.data);
        this.setState({
          weatherData: res.data,
          loading: false
        });
      });
    });
  }

  getLocation = event => {
    event.preventDefault();
    let city = event.target.elements.city.value;
    let country = event.target.elements.country.value;
    this.setState({
      city: city,
      country: country
    }); 
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.city);
    console.log(prevState);
    if (prevState.city && prevState.country !== (this.state.city && this.state.country)) {
      axios.get(locationURL(this.state.city, this.state.country)).then(res => {
    console.log(this.state.city);
        const geometry = res.data.results[0].geometry;
        axios.get(weatherURL(geometry.lat, geometry.lng)).then(res => {
          this.setState({
            weatherData: res.data,
          });
        });
      });
    }
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <div className="weather-app">
        <div className="hero-image"></div>
        <div className="main-content">
        <Forms location={this.getLocation} />
        <Weather
          timezone={this.state.weatherData.timezone}
          summary={this.state.weatherData}
          temperature={this.state.weatherData}
          
        />
        </div>
      </div>
    );
  }
}
