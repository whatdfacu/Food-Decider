const openWeatherMapApiKey = '91440eb7efb9fc43a88b9589867ec8c0';
const openWeatherMapEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

const spoonacularApiKey = 'bcb5d5cd0f614aec8ce45bc04b087c6e';
const spoonacularEndpoint = 'https://api.spoonacular.com/recipes/complexSearch';

const decideButton = document.getElementById('decide-button');
const result = document.getElementById('result');

decideButton.addEventListener('click', () => {
  const weatherInput = document.getElementById('weather').value.toLowerCase();

  // Make request to OpenWeatherMap API to get weather information
  const openWeatherMapParams = new URLSearchParams({
    q: weatherInput,
    appid: openWeatherMapApiKey,
  });

  fetch(`${openWeatherMapEndpoint}?${openWeatherMapParams}`)
    .then(response => response.json())
    .then(data => {
      const weatherCode = data.weather[0].id;

      // Make request to Spoonacular API to get food options
      const spoonacularParams = new URLSearchParams({
        cuisine: 'American,Chinese,Mexican,Italian',
        sort: 'popularity',
        apiKey: spoonacularApiKey,
      });

      fetch(`${spoonacularEndpoint}?${spoonacularParams}`)
        .then(response => response.json())
        .then(data => {
          const foods = data.results;
          const filteredFoods = foods.filter(food => {
            const weatherCodes = food.weather;
            return weatherCodes.includes(weatherCode);
          });
          if (filteredFoods.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredFoods.length);
            const chosenFood = filteredFoods[randomIndex];
            result.textContent = `How about some ${chosenFood.title} for ${weatherInput}?`;
          } else {
            result.textContent = 'Sorry, I couldn\'t figure out what to suggest based on the weather you entered.';
          }
        })
        .catch(error => {
          result.textContent = 'Error: Could not fetch food data';
          console.error(error);
        });
    })
    .catch(error => {
      result.textContent = 'Error: Could not fetch weather data';
      console.error(error);
    });
});
