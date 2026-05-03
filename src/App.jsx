import { useEffect, useState } from 'react'
import './App.css'


function MainDetailsBox({ item, value }) {

  return (

    <div className='main-details-box'>
      <div><h6>{item}</h6></div>
      <div><h3>{value}</h3></div>
    </div>

  );
}

const API_KEY = "your_api_key_here";

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);

      }

      console.log(data);
      setWeatherData(data);
      setCity('');

    } catch (error) {
      console.error("Error:", error.message);
      setWeatherData(weatherData);
      alert("City not found or API error");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Galle");
  }, [])

  return <>


    <div className="container">
      {loading && (
        <div className='overlay'>
          <div className='loader'></div>
          <p className='text'>Loading weather data...</p>
        </div>
      )}

      <div className='input-container'>
        <input type="text"
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeatherData(city)}
        />
        <button onClick={() => fetchWeatherData(city)}>🔍︎</button>
      </div>


      <div className='main-card'>
        <div className='modern-design'>
          <h5 >{weatherData ? weatherData.name : 'N/A'}</h5>
          <h1>{weatherData ? weatherData.main?.temp.toFixed(0) + "°C" : 'N/A'}</h1>
          <h6>{weatherData ? weatherData.weather[0]?.description : 'N/A'}</h6>
        </div>
        <div className='image'>
          <img src="src/assets/pngtree-flat-sun-cloud-icon-free-vector-png-image_6582790.png" alt="Weather Icon" />
        </div>



      </div >


      <div className='main-details-container'>
        <MainDetailsBox item="Humidity" value={weatherData ? weatherData?.main?.humidity + "%" : 'N/A'} />
        <MainDetailsBox item="Wind Speed" value={weatherData ? (weatherData?.wind?.speed * 3.6).toFixed(1) + " km/h" : 'N/A'} />
      </div>

    </div>
  </>
}

export default App
