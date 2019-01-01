import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeather } from '../actions';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

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

    render() {
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
                </div>
            )
        } 
        else {
            
            let temps = [];
            let tempArray = this.props.weather.graph;
            tempArray.map((measure => {
                temps.push(measure.main.temp);
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
                        <h1>The temperatures during the last 24 hours of measurements</h1>
                        <div>
                            <Sparklines data={temps}>
                                <SparklinesLine color="blue" />
                                <SparklinesReferenceLine type="min" />
                            </Sparklines>
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
