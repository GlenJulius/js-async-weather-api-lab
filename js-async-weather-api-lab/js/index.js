// This file contains the JavaScript code for fetching weather data from the Open Weather Map API.
// It includes functions to handle form submissions, make API requests, and update the DOM with weather information.

const apiKey = 'YOUR_API_KEY'; // Replace with your Open Weather Map API key

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.getElementById('city-input').value;
    const formattedCity = formatCityName(cityInput);
    fetchWeatherData(formattedCity);
    fetchForecastData(formattedCity);
}

function formatCityName(city) {
    return city.trim().replace(/\s+/g, '+');
}

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeatherInfo(data) {
    const weatherContainer = document.getElementById('weather-info');
    weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function fetchForecastData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayForecast(forecastList) {
    const forecastContainer = document.querySelector('aside');
    forecastContainer.innerHTML = '';
    
    forecastList.forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.innerHTML = `
            <p>${forecast.dt_txt}</p>
            <p>Temperature: ${forecast.main.temp} °C</p>
            <p>Humidity: ${forecast.main.humidity} %</p>
        `;
        forecastContainer.appendChild(forecastDiv);
    });
}