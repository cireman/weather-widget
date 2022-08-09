import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'
import background from './assets/weather.jpeg'

function App() {
  const [coords, setCoords] = useState(0)
  

  useEffect(() => {

    const success = pos => {
      const latLon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latLon)
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])
  

  return (
    <div className="App" >
       <div className='bg' style={{backgroundImage: `url(${background})`}}></div>
      <article className='weatherInfo__container'>
        <CardWeather 
          lat = {coords?.lat} 
          lon = {coords?.lon}
        />
      </article>
    </div>
  )
}

export default App
