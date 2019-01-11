import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeather } from '../actions';
import { Line } from 'react-chartjs-2';

class Weather extends Component {

    constructor(props) {
        super(props);

        this.state = {
            city : '', 
            graph : [],
            finished : false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
       
    }

    handleChange(event) {
        let str = event.target.value;
        this.setState({city : str});
    }

    handleSubmit(event) {
        if (this.state.city !== '' ) 
        {
            event.preventDefault();
            getWeather(this.state.city);
        }
    }

    handleChart(chartData, chartDates) {
        return {
            labels : chartDates,
            datasets : [{
                data : [...chartData, 50, -50],
                label : this.state.city
            }]
        }
    }

    render() {
        let errorMessage = ' ';
        if (this.props.weather.type === 'GET_ERROR') 
        {
           errorMessage = 'Request could not be completed.'
        }
        if (!this.props.weather.finished) 
        {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <strong>Please enter the location and country (two letter country code), separated by a comma:</strong><br />
                            <input type="text" value={this.state.city} onChange={this.handleChange} placeholder="Example: Oulu,fi" /><br />
                            <input type="submit" value="Search" />
                        </label>
                    </form>
                    <div className="error">
                        {errorMessage}
                    </div>
                </div>
            )
        } 
        else {
            
            let temps = [];
            let times = [];
            let tempArray = this.props.weather.graph;
            tempArray.map((measure => {
                temps.push(measure.main.temp);
                times.push(measure.dt_txt);
                return measure;
            }))

            return (
                <div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <strong>Please enter the location and country (two letter country code), separated by a comma:</strong><br />
                                <input type="text" value={this.state.city} onChange={this.handleChange} placeholder="Example: Oulu,fi" /><br />
                                <input type="submit" value="Search" />
                            </label>
                        </form>
                    </div>
                    <div>
                        <h1>Weather forecast for the next 24 hours, temperatures in Celsius</h1>
                        <div>
                            <Line data={this.handleChart(temps, times)} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { getWeather })(Weather)
