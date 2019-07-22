import React from 'react';
import './WeatherCardLite.css';

export default function WeatherCardLite({
  maxTemp,
  minTemp,
}) {
  return (
    <div className='weather-card-lite'>
      <span>{maxTemp}°F</span>
      <span>{minTemp}°F</span>
    </div>
  );
}