import React from 'react'
import cities from './cities.json';

interface CityProp {
    country: string;
    lat: number;
    lng: number;
    name: string
}


interface Iporps {
    setSelectedCity: (s: CityProp) => void
}
export const CityInput = (S: Iporps) => {
    const [search, setSearch] = React.useState("")
    const [cityName, setCityName] = React.useState("")
    const [cityList, setCityList] = React.useState<CityProp[]>([])

    const [hideSearchinput, setHideearchinput] = React.useState(true)
    const setSelectedcity = (city: CityProp) => {
        S.setSelectedCity(city)
        setCityName(city.name)
        setHideearchinput(true)

    }
    React.useEffect(() => {
        if (search.trim() === "") {
            return
        }
        const citiesList = cities.filter((x, ind, array) => {
            return (x.name.toLowerCase().includes(search.toLowerCase()))
        })

        setCityList(citiesList.slice(0, 5))

    }, [search])

    return (
        <div style={{ position: "relative" }}>

            {!hideSearchinput ? <input type="input" onChange={(x) =>
                setSearch(x.target.value)} /> : <input type="input" placeholder='Search City ....' value={cityName} onMouseDown={() => setHideearchinput(false)} />}
            {cityList && !hideSearchinput && <ul >
                {cityList.map((x: CityProp) => {
                    return (<li onClick={() => setSelectedcity(x)
                    } key={x.name}>{x.name} , {x.country}</li>)
                })}
            </ul>}
        </div>


    )
}