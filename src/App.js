import React, { useState, useEffect } from 'react';
import './App.css';
import classnames from 'classnames';
import WeatherCard from './WeatherCard';
import WeatherAndDate from './WeatherAndDate';
import WeatherCardLite from './WeatherCardLite';

// set up safe api key
const api_key = process.env.REACT_APP_WEATHER_API_KEY;
const api = `http://api.apixu.com/v1/forecast.json?key=${api_key}&q=Boston&days=7`;

function App() {
  const [location, setCurrentLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch(api)
      .then(results => results.json())
      .then(data => {
        console.log(data);
        const {
          current: {
            condition,
            feelslike_f,
            temp_f,
          },
          forecast: {
            forecastday,
          },
          location: {
            name,
            region,
          },
        } = data;
        setCurrentLocation({
          name,
          region,
        });
        setCurrentWeather({
          condition,
          feelsLike: feelslike_f,
          temperature: temp_f,
        });
        setForecast(forecastday);
      });
  }, []);

  const hot = currentWeather && currentWeather.feelsLike > 85;
  const cold = currentWeather && currentWeather.feelsLike < 50;
  const moderate = currentWeather && currentWeather.feelsLike > 50
    && currentWeather.feelsLike < 85;

  const appClass = classnames('app', {
    hot,
    moderate,
    cold,
  });

  return (
    <div className={appClass}>
      <div className='forecast'>
        {currentWeather && <div className='currently'>
          <WeatherCard
            condition={currentWeather.condition.text}
            feelsLike={currentWeather.feelsLike}
            icon={currentWeather.condition.icon}
            location={location}
            temperature={currentWeather.temperature}
          />
        </div>}
        {forecast && <div className='seven-day-forecast'>
          {forecast.map((weatherDay) => (
            <div className='day' key={`weather-${weatherDay.date_epoch}`}>
              <WeatherAndDate
                condition={weatherDay.day.condition.text}
                date={weatherDay.date}
                icon={weatherDay.day.condition.icon}
              />
              <WeatherCardLite
                condition={weatherDay.day.condition.text}
                maxTemp={weatherDay.day.maxtemp_f}
                minTemp={weatherDay.day.mintemp_f}
              />
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default App;
