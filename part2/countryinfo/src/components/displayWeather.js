import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayWeather = (props) => {
  const [weatherData, setWeatherData] = useState({});
  const city = props.city;
  const api = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api}&query=${city}`
      )
      .then((response) => {
        setWeatherData(response.data.current);
      });
  }, [api, city]);

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>
        <b>temperature:</b> {weatherData.temperature} celsius
      </p>
      <img src={weatherData.weather_icons} alt="weather icon"></img>
      <p>
        <b>wind:</b> {weatherData.wind_speed} mph direction{" "}
        {weatherData.wind_dir}
      </p>
    </div>
  );
};

export default DisplayWeather;
