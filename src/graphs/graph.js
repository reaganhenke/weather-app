import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import './graph.css'

const data = {
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  ]
}

class Graph extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      dataType: 'temp' // default
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({dataType: event.target.value});
  }
  
  render(){
    if (this.props.data) {
      data.labels = this.props.data.list.map(entry => entry.dt_txt).slice(0,15)
      data.datasets[0].data = this.props.data.list.map(entry => entry.main[this.state.dataType]).slice(0,15)
      switch(this.state.dataType) {
        case('temp'):
          data.datasets[0].label = 'Temperature (Celsius)'
          break
        case('humidity'):
          data.datasets[0].label  = 'Humidity (%)'
          break
        default:
          data.datasets[0].label  = 'Pressure (hPa)'
          break
      }
    }

    return (
      <div>
        <h2>Forecast</h2>
        <h3>City: {this.props.data.city.name}</h3>
        <h3>Latitude:{this.props.data.city.coord.lat}°, Longitude:{this.props.data.city.coord.lon}°</h3>
        <form>
          <label htmlFor="datatype-input">View:</label>
          <span className="after-arrow">
          <select id="searchdatatypeby-input" value={this.state.dataType} onChange={this.handleChange}>
            <option value="temp">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="pressure">Pressure</option>
          </select>
          </span>
          </form>
        <Line data={data} />
      </div>
    );
  }
}

export default Graph
