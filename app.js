const foodOptions = document.getElementById("food-options").getElementsByTagName("p");
const decideButton = document.getElementById("decide-button");
const result = document.getElementById("result");

function decide() {
  const randomIndex = Math.floor(Math.random() * foodOptions.length);
  const chosenFood = foodOptions[randomIndex].innerText;
  result.innerHTML = `You should have ${chosenFood} tonight!`;
  result.classList.remove("hidden");
  document.getElementById("food-options").classList.add("hidden");
}

decideButton.addEventListener("click", function() {
  document.getElementById("food-options").classList.remove("hidden");
  result.classList.add("hidden");
});