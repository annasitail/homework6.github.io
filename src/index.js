function formatData(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${day} ${hours}:${minutes}`;
}

function changeDate() {
  let currentDate = document.querySelector("#current-date");
  let date = new Date();
  currentDate.innerHTML = formatData(date);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degreesSpan = document.querySelector("#degrees");
  degreesSpan.innerHTML = temperature;
  console.log(response.data);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}

function getCityTemp(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value) {
    getCityTemp(cityInput.value);
  } else {
    alert("Please, enter city");
  }
  changeDate();
}

function getPosition(position) {
  console.log(`Latitude: ${position.coords.latitude}`);
  console.log(`Longitude: ${position.coords.longitude}`);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
  changeDate();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocBtn = document.querySelector("#current-location-button");
currentLocBtn.addEventListener("click", getLocation);

function changeMeasurement(event) {
  event.preventDefault();
  let degreesSpan = document.querySelector("#degrees");
  let degrees = degreesSpan.innerHTML;
  if (unitOfMeasurement.innerHTML === "°C") {
    unitOfMeasurement.innerHTML = "°F";
    degreesSpan.innerHTML = degrees * 1.8 + 32;
  } else if (unitOfMeasurement.innerHTML === "°F") {
    unitOfMeasurement.innerHTML = "°C";
    degreesSpan.innerHTML = Math.round((degrees - 32) / 1.8);
  }
}

let unitOfMeasurement = document.querySelector("#unit-of-measurement");
unitOfMeasurement.addEventListener("click", changeMeasurement);

function getGitHub()
{
    let link = "https://github.com/annasitail/homework6.github.io";
    navigator.clipboard.writeText(link);
    alert(`GitHub profile link: ${link} \n(copied to clipboard)`);
}

let github = document.querySelector("#github");
github.addEventListener("click", getGitHub);
