import axios from 'axios'
import React, { useState } from 'react'

// import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

const App = () => {
    const [inputCity, setInputCity] = useState("")
    const [temp, setTemp] = useState(273.15)
    const [lon, setLon] = useState()
    const [lat, setLat] = useState()
    const [feel, setFeel] = useState(273.15)
    const [tempmin, setTempmin] = useState(273.15)
    const [tempmax, setTempmax] = useState(273.15)
    const [pressure, setPressure] = useState()

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='
    const appid = '0f9074c9dedf1d587f816b1ecc425aed'

    const handleSearch = () => {
        getData(inputCity)

    }

    const handleInputChange = (e) => {
        setInputCity(e.target.value)
        handleSearch()
        seterror("")
    }

    const getData = (cityName) => {
        if (!cityName) {
            setError("please entee a cityname");
            return 
        }
        const apiurl = url + cityName + '&appid=' + appid;
        axios.get(apiurl).then((res) => {
            console.log(res)
            setTemp(res.data.main.temp)
            setLon(res.data.coord.lon)
            setLat(res.data.coord.lat)
            setTempmin(res.data.main.temp_min)
            setTempmax(res.data.main.temp_max)
            setFeel(res.data.main.feels_like)
            setPressure(res.data.main.pressure)
        }).catch((err) => {
            console.log(err)
        })
    }



    return <>
        <div className="col-md-12">
            <div className="weatherBg">
                <h1 className='heading'>Weather App</h1>

                <input type="text" className='form-control' value={inputCity} onChange={handleInputChange} />
                <button className='btn btn-primary' onClick={handleSearch}>Search</button>

                <div className="container">

                    <div className="result">
                        <div className='first'>
                            <p>longitude : {lon}</p>
                            <p>latitude : {lat}</p>
                            <p>feels like : {Math.floor(feel-273.15)}℃</p>
                        </div>

                        <div className="mid">
                            <img src="https://img.icons8.com/fluency/2x/partly-cloudy-day.png" alt="cloud icon" />
                            <h2>{inputCity.charAt(0).toLocaleUpperCase()+inputCity.slice(1)}</h2>
                            <h1>{Math.floor(temp - 273.15)}℃</h1>
                        </div>

                        <div className="last">
                            <p>minimum tempature : {Math.floor(tempmin-273.15)}℃</p>
                            <p>maximum tempature : {Math.floor(tempmax-273.15)}℃</p>
                            <p>pressure : {pressure}</p>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    </>
}

export default App
