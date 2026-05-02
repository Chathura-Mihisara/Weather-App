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

  return<>
  <div className="App">
    <h1>Weather app</h1>
    <input type="text" placeholder='Enter city name' value={city} onChange={(e) => setCity(e.target.value)} />
    <button >Get Weather</button>
    
    <div>
      <MainDetailsBox item="City" value={city} />
      <MainDetailsBox item="Temperature" value={'N/A'} />
      <MainDetailsBox item="Humidity" value={'N/A'} />
      <MainDetailsBox item="Description" value={'N/A'} />
    </div>
  </div>
  </>
}

export default App
