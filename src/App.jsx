import { useEffect, useState } from 'react'
import './App.css'


function MainDetailsBox({ item, value }) {

  return (

    <div className='main-details-box'>
      <div><span>{item}</span></div>
      <div><span>{value}</span></div>
    </div>

  );
}



function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
   
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0abdbb13261c239afb493cd6e3685d54`)
      let data = await response.json()
      console.log(data)
      setWeatherData(data);
   
  }

  useEffect(() => {
    fetchWeatherData("Galle");
  }, [])

  return <>

  
    <div className="container">

      <div className='input-container'>
        <input type="text" placeholder='Enter city name' value={city} onChange={(e) => setCity(e.target.value)} />
        <button onClick={() => fetchWeatherData(city)}>🔍︎</button>
      </div>


      <div className='main-card'>
        <div className='modern-design'>
          <h5 >{weatherData ? weatherData.name : 'N/A'}</h5>
          <h1>{weatherData ? (weatherData.main.temp - 273.15).toFixed(0) + "°C" : 'N/A'}</h1>
          <h6>{weatherData ? weatherData.weather[0].description : 'N/A'}</h6>
        </div>
        <div className='image'>
        <img src="src/assets/pngtree-flat-sun-cloud-icon-free-vector-png-image_6582790.png" alt="Weather Icon" />
        </div>
      </div >

      
      <div className='main-details-container'>
        <MainDetailsBox item="Humidity" value={weatherData ? weatherData.main.humidity + "%" : 'N/A'} />
        <MainDetailsBox item="Wind Speed" value={weatherData ? (weatherData?.wind?.speed * 3.6).toFixed(1) + " km/h" : 'N/A'} />
      </div>
    </div>



  </>
}

export default App
