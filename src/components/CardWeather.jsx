import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from './LoadingScreen';


const CardWeather = ({lat, lon}) => {

  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if(lat) {
      const APIKey = '744be3d65c21e161d06675bac827683a'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      
      axios.get(URL)
      .then(res => {
        setWeather(res.data)
        const temp = {
          celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
          farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
        }
        setTemperature(temp)
        setIsLoading(false)
    })
        .catch(err => console.log(err))
    }
  },[lat, lon])
  
  console.log(weather)

  const handleClick = () => setIsCelsius(!isCelsius)

  if(isLoading) {
    return <LoadingScreen />
  } else {
    return (
      <article>
        {/* <h1>Weather App</h1> */}
        
        <div className='cardWeather__info'>
          <div className='cardWeather__info-left'>
            <img className='icon' src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            <h5 className='weather-status'>&#34;{weather?.weather[0].description}&#34;</h5>
          </div>

          <div className='cardWeather__info-right'>
            <h5 className='city'>{`${weather?.name}, ${weather?.sys.country}`}</h5>
            <button className='degree' onClick={handleClick}>{isCelsius ? temperature?.celsius : temperature.farenheit}</button>
          </div>
            <div className='bottom'>
              <div><span>Wind Speed</span> {weather?.wind.speed} m/s</div>
              <div><span>Clouds</span> {weather?.clouds.all} %</div>
              <div><span>Pressure</span> {weather?.main.pressure} hPa</div>
            </div>
        </div>
      </article>
    )}
}

export default CardWeather
