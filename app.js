const apiKey = '4c54f73c67b74562ae87db4a27222873';
const apiUrl = 'https://api.spoonacular.com/recipes/random';

const suggestButton = document.getElementById('suggest-button');
const foodResult = document.getElementById('food-result');

suggestButton.addEventListener('click', () => {
  fetch(`${apiUrl}?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const food = data.recipes[0];
      const title = food.title;
      const image = food.image;
      const url = food.sourceUrl;

      const html = `
        <p>How about this?</p>
        <h2>${title}</h2>
        <a href="${url}" target="_blank"><img src="${image}" alt="${title}"></a>
      `;

      foodResult.innerHTML = html;
    })
    .catch(error => {
      console.error('An error occurred:', error);
      foodResult.textContent = 'Sorry, we could not suggest any food at this time.';
    });
});

