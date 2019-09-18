console.log("Let's get weather...");
const APIkey = 'uQkdQpggpm7j1qVPTNmr3fkfu4Z3ztgn';
let requestedCity = 'Manchester';

//F get city key
async function getCityKey(city) {

  console.log(`You wanted city ${city}.`);
  const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIkey}&q=${city}`);
  const responseJSON = await response.json();
  let cityInfo = {
    name: responseJSON[0].EnglishName,
    key: responseJSON[0].Key
  };
  console.log(`In getCityKey f. I found city ${cityInfo.name} with key ${cityInfo.key}.`);

  return cityInfo;

}
// F get weather
async function getWeatherInfo(cityKey) {
  console.log(`I am going to get weather info using ${cityKey}.`);
  const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${APIkey}`);
  const data = await response.json();
  console.log("I got these weather data: ", data);
  let weatherInfo = {
    HasPrecipitation: data[0].HasPrecipitation,
    IsDayTime: data[0].IsDayTime,
    Temperature: data[0].Temperature.Metric.Value,
    WeatherIcon: data[0].WeatherIcon,
    WeatherText: data[0].WeatherText
  };
  return weatherInfo;
}

// F get all online data
async function getAllAboutWeather(wantedCity) {
  const cityInfo = await getCityKey(wantedCity);
  console.log("In getAll f. I got these city data: ", cityInfo);

  const weatherInfo = await getWeatherInfo(cityInfo.key);
  return { cityInfo, weatherInfo };
}


getAllAboutWeather(requestedCity)
  .then(data => { console.log("here is your RETURNED data: ", data); })
  .catch(err => console.log("Error getting City key: ", err));