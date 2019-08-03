import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './graph.css';

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
};

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
      data.labels = this.props.data.list.map(entry => entry.dt_txt).slice(0,20)
      data.datasets[0].data = this.props.data.list.map(entry => entry.main[this.state.dataType]).slice(0,20)
      switch(this.state.dataType) {
        case('temp'):
          data.datasets[0].label = 'Temperature (Celsius)'
          break
        case('humidity'):
          data.datasets[0].label  = 'Humidity (%)'
          break
        case('pressure'):
          data.datasets[0].label  = 'Pressure (hPa)'
          break
      }
    }

    let location;
    if (this.props.city) {
      location = (
        <h3>{this.props.city}</h3>
      )
    } else {
      location = (
        <h3>Latitude:{this.props.latitude}°, Longitude:{this.props.longitude}°</h3>
      )
    }
    return (
      <div>
        <h2>Forecast</h2>
        {location}
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

export default Graph;
