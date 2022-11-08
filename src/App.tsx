import React from 'react';
import './App.css';
import { CityInput } from './CitySearch'
import { WeatherDataI } from './watherInterface'
var convertTime = require('convert-time');

interface CityProp {
  country: string;
  lat: number;
  lng: number;
  name: string
}
function App() {
  const [data, setData] = React.useState<WeatherDataI.RootObject>()

  const [selectedCity, setSelectedCity] =
    React.useState<CityProp>({ country: "EG", name: "Alexandria", lat: 31.21564, lng: 29.95527 })
  const now = new Date()
  React.useEffect(() => {
    console.log(selectedCity)
    const Url = "https://api.open-meteo.com/v1/forecast?latitude=" + selectedCity.lat + "&longitude=" + selectedCity.lng + "&hourly=temperature_2m"
    fetch(Url)
      .then(results => results.json())
      .then((data: WeatherDataI.RootObject) => {

        setData(data)
      });
  }, [selectedCity]);

  const getTimeAndTemp = (hour: number, Temp: number) => {
    const now = new Date()
    const isNowHour = convertTime(now.getHours() + ":00") === convertTime(hour + ':00')

    console.log(now.getHours())
    return <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid black", padding: 5, paddingRight: 20 }}>
      <div style={{ color: isNowHour ? "orange" : "black" }}>
        {hour === 0 ? "12:00 am" : convertTime(hour + ':00')}</div>
      <div>{Temp}°C </div></div>
  }
  return (
    <div className="App">

      <CityInput setSelectedCity={setSelectedCity} />
      <h1>{selectedCity.name + ", " + selectedCity.country}</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3> NOW: {data?.hourly.temperature_2m[now.getHours()]}°C</h3>
        <div>Elevation:{data?.elevation}</div>
        <div>Date: {data && new Date(data?.hourly.time[0]).toDateString()}</div>

      </div>
      <div style={{ height: 300, width: 300, overflowY: "scroll", overflowX: "hidden" }}>
        {data?.hourly.temperature_2m.slice(0, 24).map((x, index) => {

          return (<div style={{ width: 300 }}>{getTimeAndTemp(index, x)}</div>)
        })}
      </div>
    </div>
  );
}

export default App;
