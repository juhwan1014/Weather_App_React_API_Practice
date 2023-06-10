import React , {useState} from 'react';
import axios from 'axios';

import './App.css';
import Forecast from './components/forecast';

function App() {

    const [data, setData] = useState({})
    const  [forecast, setForecast] = useState({})
    const [location, setLocation] = useState("")

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=879d0343fc77e78f633b5793305bb3f9`

    const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=879d0343fc77e78f633b5793305bb3f9`


    const searchLocation = async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // 기본 이벤트 처리 방지
    
        try {
          const responsePromises = [
            axios.get(url),
            axios.get(forecast_url)
          ];
    
          const [responseData, forecastResponse] = await Promise.all(responsePromises);
    
          setData(responseData.data);
          setForecast(forecastResponse.data);
        } catch (error) {
          handleAxiosError();
        }
    
        setLocation('');
      }
    };
    
    let isAlertShown = false; // 알림이 이미 표시되었는지 여부를 추적하는 변수
    
    const handleAxiosError = () => {
      if (!isAlertShown) {
        alert('You entered invalid input, please enter again the valid location name !');
        isAlertShown = true; // 알림을 표시했음을 표시
      }
    };
  

  return (
    <div className="App">

      <div className='search'>
        <input
        value={location}
        onChange = {event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder = "Enter Location"
        type="text"
        />
      </div>
<div className='Large_container'>
    <div className='container'>
    {!data.name && <div className='head'>
      Hi ~ 🤗 I'm Weather ForeCast Application! Please, Enter the location you want to find ...
      </div>}
      {!data.name && <div className='tail'>
      ( If you search for an invalid location name, an error message will appear )
      </div>}

    {data.name && <div className='top'>

        <div className='location'>
          <p>Location : </p><div className='font'>{data.name}</div>
        </div>
        <div className='temp'>
          { data.main ? <div className='temp2'><h1>{data.main.temp.toFixed()} ℃</h1><div className='ct'>
            {/* (Current Temperature) */}
            <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
            </div></div> : null}
          
        </div>
        <div className='description'>
        <p>Description : </p>
        { data.weather ? <div className='font'>{data.weather[0].description}</div> : null}
        </div>
      </div>
}

      {data.name  &&
      <div className='bottom'>
        <div className='feels'>
        { data.main ? <p>{data.main.feels_like.toFixed()}℃</p> : null}
          <p>Feels Like</p>
        </div>
        <div className='humidity'>
        { data.main ? <p>{data.main.humidity}%</p> : null}
        <p>Humidity</p>
        </div>
        <div className='wind'>
        { data.wind ? <p>{data.wind.speed.toFixed()}MPH</p> : null}
        <p>Wind Speed</p>
        </div>

      </div>

}


    </div>
    {forecast && <Forecast data={forecast}/>}
    </div> 
    </div>
  );
}

export default App;
