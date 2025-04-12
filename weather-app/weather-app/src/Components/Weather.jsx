import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png' 
import clear from '../assets/clear.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png' 



const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setData] = useState(false);

    const search = async (city)=>{
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`;
            const response = await fetch(URL);
            const data = await response.json();
            let icon_img = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` || clear
           // console.log(data);
           setData({
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            temp: Math.floor(data.main.temp),
            location: data.name,
            icon: icon_img
           })
        } catch (error) {
            setData(false);
            console.log("Oops! Couldn't feth data right now. Please try again.")  
        }
    }

    useEffect(()=>{
        search("Delhi");
    },[])


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search' onKeyDown={(e)=>{if(e.key === "Enter"){
                search(inputRef.current.value)
            }}}/>
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
        </div>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temp'>{weatherData.temp}°C</p>
        <p className='location'> {weatherData.location} </p>
        <div className="weather-data">
            <div className="column">
                <img src={humidity} alt="" />
                <p> {weatherData.humidity}% </p>
                    <span> Humidity </span>
                </div>
                <div className="column">
                <img src={wind} alt="" />
                <p> {weatherData.wind_speed} Km/hr </p>
                    <span> Wind </span>
                </div>
                </div>
            </div>
  )
}

export default Weather