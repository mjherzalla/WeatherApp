import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CityInput } from './CitySearch'
interface CityGeio {
  latitude: number
  longitude: number
}
function App() {
  const [data, setDate] = React.useState<any>([])
  const [selectedCity, setSelectedCity] = React.useState<CityGeio>({ latitude: 0, longitude: 0 })

  React.useEffect(() => {
    const Url = "https://api.open-meteo.com/v1/forecast?latitude=48.2092&longitude=16.3728&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,freezinglevel_height,weathercode,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_80m"
    fetch(Url)
      .then(results => results.json())
      .then(data => {
        console.log(data)
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <CityInput setSelectedCity={setSelectedCity} />
      </header>
    </div>
  );
}

export default App;
