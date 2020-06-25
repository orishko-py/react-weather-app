import React, { Component } from 'react';
import Weather from "./weather";
import "./location.css";

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            lat: null,
            lon: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.setState({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                })
            }
        )
    }

    render() { 
        if (this.state.lat == null || this.state.lon == null) {
            return <h2>Loading....</h2>
        }
        return (
            <React.Fragment>
                <div className = "background">
                    <Weather lon={this.state.lon} lat ={this.state.lat}/>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Location;