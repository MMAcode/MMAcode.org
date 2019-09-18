

cityInput = document.querySelector('#weather-search');

//F get online info
const getWeatherInfo = async (city_) => {
  console.log(city_);
  const cityInfo = await getCity(city_);
  const weather = await getWeather(cityInfo.Key);
  return { cityInfo, weather };
};


//F update info in HTML, save city
function updateUI(data) {
  const image = document.querySelector('#weather-photo');
  const weatherInfoDisplay = document.querySelector('#weather-info');
  const hiddenInfo = document.querySelector('#hidden-weather');

  weatherInfoDisplay.innerHTML = `
  <img src="img/icons/${data.weather.WeatherIcon}.svg"></<img>
  <h2>${data.cityInfo.EnglishName}</h2>
  <p>(${data.cityInfo.Country.EnglishName})</p>
        <p>${data.weather.WeatherText} </p>
        <h1 id="temperature">${data.weather.Temperature.Metric.Value} °C</h1>
  `;

  let imgSrc = data.weather.IsDayTime ? '<img src="img/download.png">' : '<img src="img/night.svg"/>';
  image.innerHTML = imgSrc;
  hiddenInfo.style.display = 'block';

  // save city in local storage
  localStorage.setItem('city', data.cityInfo.EnglishName);
};




// check if city name saved--> change UI
if (localStorage.city) {
  getWeatherInfo(localStorage.city)
     .then(data => {
      updateUI(data);
      console.log(`Used saved name: ${localStorage.city}`);
    })
    .catch(err => console.log(err));

}


//A get city, get online info, show info
cityInput.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.city.value.trim();
  cityInput.reset();

  getWeatherInfo(city)
    .then(data => {
      updateUI(data);
    })
    .catch(err => console.log(err));
});














//** */ using server-request original
// getCity(city)
//   .then(data => {
//     console.log('Requesting City - resolved:', data);
//     console.log(`Requested city "${city}" found under name "${data.EnglishName}"`);
//     return getWeather(data.Key);
//   })
//   .then(data => {
//     console.log('Requesting City Weather - resolved:', data);
//     // return data;
//   })
//   .catch(err => console.log('rejected:', err.message));

