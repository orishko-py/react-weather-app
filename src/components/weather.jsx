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
        this.handleReturn= this.handleReturn.bind(this);
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
                        const timeZone = current.timezone;
                        // Daylight Savings Time offset hack
                        const dstoffset = -3600;
                        console.log(timeZone);
                        console.log()
                        this.setState({ 
                            sunrise: this.formatTime(new Date((current.sys.sunrise + timeZone + dstoffset) * 1000)),
                            sunset: this.formatTime(new Date((current.sys.sunset + timeZone + dstoffset) * 1000)),
                            currentTemp: current.main.temp.toFixed(0),
                            currentHigh: current.main.temp_max.toFixed(0),
                            currentLow: current.main.temp_min.toFixed(0),
                            currentFeelsLike: current.main.feels_like.toFixed(0),
                            currentDescription: current.weather[0].description,
                            currentMain: current.weather[0].main,
                            timestamps: forecast.list.map(obj => new Date((obj.dt + timeZone + dstoffset) * 1000)),
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

    handleReturn() {
        this.setState({
            searchRequest: ''
        })
        const { lon, lat } = this.props
        const apiKey = '541d088bac0c6ef615e53e06d8497f14';
        const current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        this.fetchWeatherData(current, forecast);
    }

    getBoxes(arr) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
        return arr.map(e => (
                    
                    <div key = {e[0]} className="card">
                        <p>{e[0].getDate() +' '+ months[parseInt(e[0].getMonth())]}</p>
                        <p>{this.formatHours(e[0])}</p>
                        <img src={this.getIcons(e[0], e[2])} alt = 'icons'/>
                        <p>{e[1]}&deg;</p>
                        <p>{e[2]}</p>
                        
                        
                    </div>));
    }

    formatHours(time) {
        const hours = time.getHours().toString();
        return hours.length === 2 ? hours + ":00" : "0" + hours + ":00"
    }

    formatTime(time) {
        let hours = time.getHours().toString();
        let minutes = time.getMinutes().toString();
        hours = hours.length === 2 ? hours : "0" + hours;
        minutes = minutes.length === 2 ? minutes: "0" + minutes;
        return hours + ":" + minutes;
    }

    getIcons(time, desc) {
        const hour = time.getHours();
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
        if (this.state.cityName === null || this.state.temps === []) {
            return <h2>Loading...</h2>
        }
        const {timestamps, temps, descriptions } = this.state;
        const zip = (arr1, arr2, arr3) => arr1.map((k, i) => [k, arr2[i], arr3[i]]);

        return (
        <React.Fragment>
            {console.log(zip(timestamps,temps,descriptions))}
            <div className = "current-weather">

                <div className = "city" style = {{fontSize: 54, fontFamily: 'Exo'}}>
                    {this.state.cityName}
                </div>
                <img src={this.getIcons(new Date(), this.state.currentMain)} alt = "weatherIcon"
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
                    Select another location:
                    <input onChange = {this.handleInput} value = {this.state.searchRequest} 
                    type="text" className="input"/>
                    <button onClick={this.handleSearch}>
                        Search
                    </button>
                    <p>
                        <button onClick= {this.handleReturn} className = "button-style">
                            Return to my location
                        </button>
                    </p>

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