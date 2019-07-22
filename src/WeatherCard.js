import React from 'react';
import './WeatherCard.css';
import moment from 'moment';

export default function WeatherCard({
  condition,
  feelsLike,
  icon,
  location,
  temperature,
}) {
  return (
    <section className='weather-card'>
      <div className='location'>
        <h1>{location.name}</h1>
        <h3>{location.region}</h3>
        <span>{moment().format('dddd, MMMM D, YYYY')}</span>
      </div>
      <div className='weather'>
        <div className='current-temperature'>
          <img src={icon} alt={condition} />
          <h1>{temperature}°F</h1>
        </div>
        <span>Feels Like: {feelsLike}°F</span>
        <span>{condition}</span>
      </div>
    </section>
  );
}