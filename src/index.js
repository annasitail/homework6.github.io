function formatDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp)
{
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecasts(response)
{
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecasts");
	let forecastHTML = "";

	forecast.forEach(function (forecastDay, index) 
	{
		if (index > 0 && index < 6)
		{
			forecastHTML = forecastHTML + `
			<div class="col row forecast-other first">
				<p class="col date">
					${formatDay(forecastDay.dt)}
				</p>
				<p class="col sun-status">
					<img class="weather-icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" />
				</p>
				<p class="temperature">
					${Math.round(forecastDay.temp.min)}°C ... ${Math.round(forecastDay.temp.max)}°C
				</p>
			</div>
			`;
		}
	});
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates)
{
	console.log(coordinates);
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecasts);
}

function changeDate() {
	let currentDate = document.querySelector("#current-date");
	let date = new Date();
	currentDate.innerHTML = formatDate(date);
}

function showTemperature(response) {
	let degreesSpan = document.querySelector("#degrees");
	let cityName = document.querySelector("#city-name");
	let weatherIcon = document.querySelector("#weather-icon");
	let weatherDescription = document.querySelector("#weather-description");

	let temperature = Math.round(response.data.main.temp);
	degreesSpan.innerHTML = temperature;
	cityName.innerHTML = response.data.name;
	weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	weatherIcon.setAttribute("alt", response.data.weather[0].description);
	weatherDescription.innerHTML = response.data.weather[0].description;

	getForecast(response.data.coord);
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

let cityName = document.querySelector("#city-name");
console.log(cityName.innerHTML);
if (!cityName.innerHTML)
{
	getCityTemp("Kyiv");
	changeDate();
}