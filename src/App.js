import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';
import { FaSearchLocation } from 'react-icons/fa'; 


const App = () => {

  const unsplashKey = "D6WWHssanObs75SfSTRhSnBSTe0U9aSz5pjUfga-O6Y"
  const weatherKey = "557ad1bb16f01478cccba0a34c796ef1"
  const [temp, setTemp] = useState({});
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("Toronto");
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    ifClicked();
  }, []);

  const ifClicked = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${weatherKey}&units=metric`
    ).then((res) => {
        if (res.ok){
          //console.log(res.status)
          return res.json();
        }else{
          if(res.status === 404){
            return alert("Error! - 404 bad location")
          }
          alert("Error!")
          throw new Error("You have an error!")
        }
    })
    .then((object) => {
      setTemp(object)
      setWeather(object.weather)
      //console.log(weather)
      //console.log(object)
    })
    .catch((error) => console.log(error));
    

    fetch(
      `https://api.unsplash.com/search/photos?query=${weather?.[0]?.description}&client_id=${unsplashKey}`
    )
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        throw new Error("Mistakes were made.")
      }
    })
    .then((data) => {
      //console.log(data)
      setPhoto(data?.results[0]?.urls?.raw)
    })
    .catch((error) => console.log(error))
  }


  const handleEnter = e => {
    if (e.key === "Enter") {
        e.preventDefault()
        ifClicked()
    }
}

  return (
    <div className='app'>
              <h1> React Weather App</h1>
      <div className='wrapper'>

      <h3 className='date'>
            Today's Date:      {moment().format("dddd, MMMM Do YYYY, h:mm a")}
          </h3>
        <div className='search'>
        <div className='form-container' >
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Enter a location'
            className='input-text'
            onKeyDown={handleEnter}
            
          />
                    <button
            className='input-submit'
            onClick={ifClicked}
          >
            <FaSearchLocation style={{ color: "black", fontSize: "20px", marginTop: "2px" }}/>
          </button>  
        </div> 
          <div className='app__data'>
            <table className='temp'>
              <tbody>
                <tr className='temp'> 
                  <td>
                    Location: {temp?.name}, {temp?.sys?.country} <br/>
                    Feels like: {Math.round(temp?.main?.feels_like)} &deg;C <br/>
                    Current Temperature: {Math.round(temp?.main?.temp)} &deg;C <br/>
                  </td>
                  <td className='spacer'></td>
                  <td>
                  High of the day: {Math.round(temp?.main?.temp_max)} &deg;C <br/>
                  Low of the day: {Math.round(temp?.main?.temp_min)} &deg;C <br/>
                  Description: {weather?.[0]?.description}
                  </td>
                  <td className='spacer'></td>
                  <td>
                  Wind Speed:  {Math.round(temp?.wind?.speed)} KM\Hr <br/>
                  Sunrise: {new Date(temp?.sys?.sunrise * 1000).toLocaleTimeString('en-IN')} <br/>
                  Sunset: {new Date(temp?.sys?.sunset * 1000).toLocaleTimeString('en-IN')}
                  </td>
               </tr>
            </tbody>
          </table>
        </div>
        </div>
          <img className='app__image' src={photo} alt=''/>
      </div>
    </div>



/*     <div className="main">
      <h1>React Weather App</h1>
    </div> */
  );
}

export default App;
