import React, { Component } from 'react';
import clearDay from '../weatherIcons/day.svg';
import clearNight from '../weatherIcons/night.svg';
import cloudyDay from '../weatherIcons/cloudy-day.svg';
import cloudyNight from '../weatherIcons/cloudy-night.svg';
import rainy from '../weatherIcons/rainy.svg';
import snowy from '../weatherIcons/snowy.svg';
import './weather.css'
import 'bootstrap/dist/css/bootstrap.css';
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchRequest: '',
            temps: [],
            timestamps: [],
            currentDescription: null,
            sunset: null, 
            sunrise: null,
            currentTemp: null,
            currentFeelsLike: null,
            currentMain: null,
            descriptions: [],
            cityName: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch= this.handleSearch.bind(this);
    }

    fetchWeatherData(current, forecast) {
        Promise.all([fetch(current), fetch(forecast)])
        .then(([resp1, resp2]) => {
            if (resp1.ok && resp2.ok) {
                return [resp1, resp2]
            }
            throw new Error('Network response was not ok.');
        })
        .then(([resp1, resp2]) => Promise.all([resp1.json(),resp2.json()]))
        .then(([current,forecast]) => {
                        
                        this.setState({ 
                            sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString().slice(0,-3),
                            sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString().slice(0, -3),
                            currentTemp: current.main.temp.toFixed(0),
                            currentHigh: current.main.temp_max.toFixed(0),
                            currentLow: current.main.temp_min.toFixed(0),
                            currentFeelsLike: current.main.feels_like.toFixed(0),
                            currentDescription: current.weather[0].description,
                            currentMain: current.weather[0].main,
                            timestamps: forecast.list.map(obj => new Date(obj.dt * 1000).toLocaleString().slice(0,-6)),
                            temps: forecast.list.map(obj => obj.main.temp.toFixed(0)),
                            descriptions: forecast.list.map(obj => obj.weather[0].main),
                            cityName: forecast.city.name
                        });
                        console.log(this.state.temps);
        })
        .catch(error => {console.log(error)});
    }
    componentDidMount() {
        console.log(this.state.searchRequest)
        const { lon, lat } = this.props
        const apiKey = '541d088bac0c6ef615e53e06d8497f14';
        const current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        this.fetchWeatherData(current, forecast);
    }
    
    handleInput(e) {
        
        this.setState({
            searchRequest: e.target.value
        });
        console.log(this.state.searchRequest)
    }
    handleSearch() {
        if (this.state.searchRequest !== '') {
            const apiKey = '541d088bac0c6ef615e53e06d8497f14';
            const current = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.searchRequest}&appid=${apiKey}&units=metric`;
            const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchRequest}&appid=${apiKey}&units=metric`;
            this.fetchWeatherData(current, forecast);
        }
    }


    getBoxes(arr) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
        return arr.map(e => (
                    <div key = {e[0]} className="card">
                        <p>{e[0].slice(0,2) +' '+ months[parseInt(e[0].slice(3,5)) - 1]}</p>
                        <p>{e[0].slice(-2)+':00'}</p>
                        <img src={this.getIcons(e[0], e[2])}/>
                        <p>{e[1]}&deg;</p>
                        <p>{e[2]}</p>
                        
                        
                    </div>));
    }

    getIcons(time, desc) {
        const hour = parseInt(time.slice(-2));
        const night = (hour >= 18) || (hour <= 5);
        if (desc === 'Rain') {
            return rainy;
        } else if (desc === 'Clouds' && night) {
            return cloudyNight;
        } else if (desc === 'Clouds' && !night) {
            return cloudyDay;
        } else if (desc === 'Clear' && !night) {
            return clearDay;
        } else if (desc === 'Clear' && night) {
            return clearNight;
        } else {
            return snowy;
        }
    }

    render() { 
        if (this.state.cityName == null || this.state.temps == []) {
            return <h2>Loading...</h2>
        }
        const {timestamps, temps, descriptions, city} = this.state;
        const zip = (arr1, arr2, arr3) => arr1.map((k, i) => [k, arr2[i], arr3[i]]);

        return (
        <React.Fragment>
            {console.log(zip(timestamps,temps,descriptions))}
            <div className = "current-weather">

                <div className = "city" style = {{fontSize: 54, fontFamily: 'Exo'}}>
                    {this.state.cityName}
                </div>
                <img src={this.getIcons(new Date().toLocaleString().slice(0,-6), this.state.currentMain)} 
                    className="current-weatherIcon"/>
                <div className = "weatherIcon">
                    
                    <p style ={{fontSize:25, fontFamily: 'Exo'}}>
                        {this.state.currentDescription}
                    </p>
                    <p style={{fontSize: 44, fontFamily: 'Exo'}}>
                        {this.state.currentTemp}&deg;
                    </p>
                    
                    <p>feels like {this.state.currentFeelsLike}&deg;</p>
                </div>
                <div className="more-info">
                    <p>sunrise at {this.state.sunrise}</p>
                    <p>sunset at {this.state.sunset}</p>
                    <p>today's high: {this.state.currentHigh}&deg;</p>
                    <p>today's low: {this.state.currentLow}&deg;</p>
                </div>
                <div className='search'>
                    <p>Select another location</p>
                    <input onChange = {this.handleInput} value = {this.state.searchRequest} type="text" className="input"/>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
            </div>

            <div className= "bottom-forecast">
                <div style={{fontSize: 40, fontFamily: 'Exo'}} className="forecast">
                    Forecast
                </div>
                <div className="forecast-wrapper">
                    {this.getBoxes(zip(timestamps,temps,descriptions))}
                </div>
            </div>

            
        </React.Fragment>)
    }
}
 
export default Weather;