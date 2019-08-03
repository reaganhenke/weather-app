import React, { Component } from 'react'
import Graph from './graphs/graph'
import Header from './header/header'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchBy: 'lat-long',
      city: '',
      zip: '',
      latitude: '',
      longitude: '',
      data: null,
      error: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setDefault = this.setDefault.bind(this)
  }

  setDefault(position) {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
    this.getWeatherData()
  }

  handleChange(event) {
    // reset the form if switching search by type
    if (event.target.name === 'searchBy'){
      this.setState({
        city: '',
        latitude: '',
        longitude: '',
        zip: ''
      })
    }
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.getWeatherData()
  }

  getWeatherData () {
    const appId = 'e72bb3768d242f077628da2034de1cdd';
    let query
    switch (this.state.searchBy) {
      case('lat-long'):
        query = `lat=${this.state.latitude}&lon=${this.state.longitude}`
        break
      case('city'):
        query = `q=${this.state.city},us`
        break
      case('zip'):
        query = `zip=${this.state.zip},us`
        break
    }
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${appId}&units=metric`)
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
      .catch(error => {
        this.setState({error})
      })
  }

  render(){
    // if we're not showing anything yet, get current location
    if (!this.state.data) {
      navigator.geolocation.getCurrentPosition(this.setDefault)
    };

    // disable submit if empty form
    const { city, latitude, longitude, zip } = this.state
    const isEnabled = city || (latitude && longitude) || zip

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
    } else if (this.state.searchBy === "city") {
      innerForm = (
        <div className="col">
          <label htmlFor="city-input">City:</label>
          <input id="city-input" value={this.state.city} name="city" type="text" onChange={this.handleChange}/>
        </div>
      )
    } else {
      innerForm = (
        <div className="col">
          <label htmlFor="zip-input">Zip code:</label>
          <input id="zip-input" value={this.state.zip} name="zip" type="text" onChange={this.handleChange}/>
        </div>
      )
    }

    let graph;
    if (this.state.error || (this.state.data && !this.state.data.list)) {
      graph = (<p>There was an problem with your request. Try again?</p>)
    } else if (this.state.data) {
      graph = (<Graph data={this.state.data}></Graph>)
    }

    return (
      <div className="app">
        <Header></Header>
        <form onSubmit={this.handleSubmit} className="col">
          <label htmlFor="searchby-input">Search by:</label>
          <span className="after-arrow">
          <select id="searchby-input" value={this.state.searchBy} name="searchBy" onChange={this.handleChange}>
            <option value="lat-long">latitude and longitude</option>
            <option value="city">city</option>
            <option value="zip">zip code</option>
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

export default App
