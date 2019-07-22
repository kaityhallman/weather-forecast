import React from 'react';
import moment from 'moment';
import './WeatherAndDate.css';

export default function WeatherAndDate({
  condition,
  date,
  icon,
}) {
  return (
    <div className='weather-and-date'>
      <span>{moment(date).format('ddd')}</span>
      <img className='condition' src={icon} alt={condition} />
    </div>
  );
}