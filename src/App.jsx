import { useState } from 'react'
import './App.css'


function MainDetailsBox({item,value}){

  return(
    
    <div >
        <div><span>{item}</span></div>
        <div><span>{value}</span></div>
    </div>
   
  );
}



function App(){
 const [city, setCity] = useState('');
 const [weatherData, setWeatherData] = useState(null);

 const  fetchWeatherData = async () => {
     let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0abdbb13261c239afb493cd6e3685d54`)
     let data = await response.json()
     console.log(data)
     setWeatherData(data);
 }

  return<>
  <div className="App">
    <h1>Weather app</h1>
    <input type="text" placeholder='Enter city name' value={city} onChange={(e) => setCity(e.target.value)} />
    <button onClick={fetchWeatherData}>Get Weather</button>
    
    <div>
      <MainDetailsBox item="City" value={city} />
      <MainDetailsBox item="Temperature" value={weatherData ? weatherData.main.temp  : 'N/A'} />
      <MainDetailsBox item="Humidity" value={ weatherData ? weatherData.main.humidity : 'N/A'} />
      <MainDetailsBox item="Description" value={weatherData ? weatherData.weather[0].description : 'N/A'} />
    </div>
  </div>
  </>
}

export default App
