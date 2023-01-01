// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // Get the form element
  const form = document.getElementById('weather-form');

  // Add an event listener to the form
  form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the city name from the form
    const city = document.getElementById('city').value;

    // Use Mapbox API to get the latitude and longitude for the given city
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoidHQwMSIsImEiOiJjbGNhbWhpNGcxdjdxM3Vyazd5eXNxcmY1In0.m14SyAfqMDK4MQhLeKBsJw`;
    axios.get(geocodeUrl)
      .then((response) => {
        // Get the latitude and longitude from the response
        const latitude = response.data.features[0].center[1];
        const longitude = response.data.features[0].center[0];

        // Use Dark Sky API to get the weather data for the given latitude and longitude
        const weatherUrl = `https://api.darksky.net/forecast/69c057a17f6f6526a0dc1601c08d02d1/${latitude},${longitude}`;
        axios.get(weatherUrl)
          .then((response) => {
            // Get the weather data from the response
            const temperature = response.data.currently.temperature;
            const summary = response.data.currently.summary;

            // Display the weather data in the "weather-data" div
            const weatherData = document.getElementById('weather-data');
            // weatherData.innerHTML = `Temperature: ${temperature}°F<br>Summary: ${summary}`;
            weatherData.textContent = `Temperature: ${temperature}°F<br>Summary: ${summary}`;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});