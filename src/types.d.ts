export interface WeatherData {
    location: string;
    temperature: string;
    forecast:string;
    //  properties for wave and tide information as needed
  }
  export interface WaveTideData{
    location: location;
    wave_height: wave_height
    tide_height: tide_height;
  }