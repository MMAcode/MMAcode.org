const accuKey = 'uQkdQpggpm7j1qVPTNmr3fkfu4Z3ztgn';
let city = '';

const getWeather = async (cityNumber) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityNumber}?apikey=${accuKey}`;

  const response = await fetch(base + query);
  const data = await response.json();
  console.log('Now I am going to request weather info based on city id number');
  console.log('Requesting City Weather - resolved:', data[0]);
  return data[0];
}

const getCity = async (city) => {
  const citiesBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${accuKey}&q=${city}`;
  const response = await fetch(citiesBase + query);
  const data = await response.json();
  console.log('Requesting City - resolved:', data);
  console.log(`Requested city "${city}" found under name "${data[0].EnglishName}" with key:${data[0].Key}`);
  return data[0];
}

