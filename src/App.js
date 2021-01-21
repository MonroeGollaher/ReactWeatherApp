import React, { useState } from 'react';
// import { api } from './services/AxiosService';
import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const api = {
  key: "1ef002bb8e45c35d2232da183d831698",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear(); 

    return (
      <div>
        <div className="col">
          {day}, {date} of {month}, {year}
        </div>
      </div>
      )
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar form-control"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {( typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>

            <div className="row date">
              <div className="col">
              {dateBuilder(new Date())}
              </div>
            </div>
          </div>

          <div className="row justify-content-center weather-box">
            <div className="col-12 temp">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="col-12 weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}
export default App;
