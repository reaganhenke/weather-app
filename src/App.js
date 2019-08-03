import React, { Component } from 'react';
import Graph from './graphs/graph';
import Header from './header/header';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchBy: 'lat-long',
      city: '',
      latitude: '',
      longitude: '',
      data: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.baseState = this.state
  }

  handleChange(event) {
    // reset the form if switching search by type
    if (event.target.name === 'searchBy'){
      this.setState(this.baseState);
    }
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getWeatherData();
  }

  getWeatherData () {
    const appId = 'e72bb3768d242f077628da2034de1cdd';
    const query = this.state.city ? `q=${this.state.city},us` : `lat=${this.state.latitude}&lon=${this.state.longitude}`
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${appId}&units=metric`)
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
      .catch(e => e)
  }

  render(){
    const { city, latitude, longitude } = this.state;
    const isEnabled = this.state.searchBy === 'city' ? city : latitude && longitude;

    let innerForm;
    if (this.state.searchBy === "lat-long") {
      innerForm = (
        <div className="col">
          <label htmlFor="lat-input">Latitude:</label>
          <input id="lat-input" type="text" value={this.state.latitude} name="latitude" onChange={this.handleChange} placeholder="0°"/>
          <label htmlFor="long-input">Longitude:</label>
          <input id="long-input" type="text" value={this.state.longitude} name="longitude" onChange={this.handleChange} placeholder="0°"/>
        </div>
      )
    } else {
      innerForm = (
        <div className="col">
          <label htmlFor="city-input">City:</label>
          <input id="city-input" value={this.state.city} name="city" type="text" onChange={this.handleChange}/>
        </div>
      )
    }

    const graph = this.state.data ? (
      <Graph data={this.state.data} city={this.state.city} longitude={this.state.longitude} latitude={this.state.latitude} type='temp'></Graph>
    ) : '';

    return (
      <div className="app">
        <Header></Header>
        <form onSubmit={this.handleSubmit} className="col">
          <label htmlFor="searchby-input">Search by:</label>
          <span className="after-arrow">
          <select id="searchby-input" value={this.state.searchBy} name="searchBy" onChange={this.handleChange}>
            <option value="lat-long">latitude and longitude</option>
            <option value="city">city</option>
          </select>
          </span>
          {innerForm}
          <button type="submit" disabled={!isEnabled}>Let's go!</button>
          <hr></hr>
        </form>
        <div>
          {graph}
        </div>
      </div>
    );
  }
}

export default App;
