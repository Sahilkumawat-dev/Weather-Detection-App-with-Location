const weatherApiKey = 'https://jsonplaceholder.typicode.com/posts/1'; // fack api
const weatherApiBase = 'https://api.openweathermap.org/data/2.5/weather'; // Actual Weather API base (actul api not used )

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim(); 
    if (city === '') {
        alert('Bhai, pehle city ka naam daal na!'); 
        return;
    }

    fetchWeatherData(`q=${city}`); 
});

document.getElementById('getLocation').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Bhai, tera browser geolocation support nahi karta 😔'); 
        return;
    }
//access current loaction
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get latitude and longitude
            fetchWeatherData(`lat=${latitude}&lon=${longitude}`); 
        },
        () => {
            alert('Bhai, location nahi mil pa rahi 😢'); // Alert if location is not available
        }
    );
});

// Fake API Data Simulation

function fetchWeatherData(query) {
    const mockData = {
        userId: 1,
        id: 1,
        title: "Mock City Weather",
        body: "Temperature: 25°C, Weather: Clear Sky, Humidity: 50%, Wind Speed: 5 m/s"
    };

    const mockWeatherInfo = `
        <p><strong>City:</strong> Rajasthan</p>
        <p><strong>Temperature:</strong> 18 °C</p>
        <p><strong>Weather:</strong> Clear Sky</p>
        <p><strong>Humidity:</strong> 50%</p>
        <p><strong>Wind Speed:</strong> 5 m/s</p>
    `;

    document.getElementById('weatherResult').innerHTML = mockWeatherInfo; 
}

// Uncomment the code below if you want to switch to real API usage
/*
function fetchWeatherData(query) {
    fetch(`${weatherApiBase}?${query}&appid=${weatherApiKey}&units=metric`) // Fetch data from the real API
        .then(response => {
            if (!response.ok) {
                throw new Error('City nahi mili ya weather data fetch nahi ho raha 😬');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            displayWeather(data); // Display the weather data
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}
*/

// Function to Display Weather Data
function displayWeather(data) {
    const weatherInfo = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherInfo; // Update the UI with real data
}
