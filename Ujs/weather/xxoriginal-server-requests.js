const accuKey = 'FNbrxzj4w3cvzrrtuITB8apm9szcW6AE';
let city = '';

const getWeather = async (cityNumber) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityNumber}?apikey=${accuKey}`;

  const response = await fetch(base + query);
  const data = await response.json();
  // console.log(data);
  return data[0];
}

const getCity = async (city) => {
  const citiesBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${accuKey}&q=${city}`;
  const response = await fetch(citiesBase + query);
  const data = await response.json();
  return data[0];
}

// city = 'manchester'




getCity(city)
  .then(data => {
    console.log('Requesting City - resolved:', data);
    console.log(`Requested city "${city}" found under name "${data.EnglishName}"`);
    return getWeather(data.Key);
  })
  .then(data => {
    console.log('Requesting City Weather - resolved:', data);
    // return data;
  })
  .catch(err => console.log('rejected:', err.message));

