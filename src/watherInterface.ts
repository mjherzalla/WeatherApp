export module WeatherDataI {

    export interface HourlyUnits {
        time: string;
        temperature_2m: string;
    }

    export interface Hourly {
        time: string[];
        temperature_2m: number[];
    }

    export interface RootObject {
        latitude: number;
        longitude: number;
        generationtime_ms: number;
        utc_offset_seconds: number;
        timezone: string;
        timezone_abbreviation: string;
        elevation: number;
        hourly_units: HourlyUnits;
        hourly: Hourly;
    }

}

