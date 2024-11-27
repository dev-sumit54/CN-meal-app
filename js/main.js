const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("searchResults");
// Initialize local storage for favorites if not already set
if (!localStorage.getItem("favorites")) {
  localStorage.setItem("favorites", JSON.stringify([]));
}

searchInput.addEventListener("keyup", async () => {
  const query = searchInput.value.trim();

  if (query) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    console.log("from searchInput main.js line 11", data);
    displayResults(data.meals);
  } else {
    resultsContainer.innerHTML = "";
  }
});

function displayResults(meals) {
  resultsContainer.innerHTML = "";
  if (meals) {
    meals.forEach((meal) => {
      resultsContainer.innerHTML += `
        <div class="col-md-3 p-2 g-col-7">
          <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${
        meal.strMeal
      }">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <button 
                class="btn ${
                  isFavorite(meal.idMeal) ? "btn-danger" : "btn-primary"
                }" 
                id="fav-btn-${meal.idMeal}" 
                onclick="toggleFavorite('${meal.idMeal}', this)">
                ${
                  isFavorite(meal.idMeal)
                    ? "Remove from Favourites"
                    : "Add to Favourites"
                }
              </button>
              <a href="meal.html?id=${
                meal.idMeal
              }" class="btn btn-secondary">View Details</a>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    resultsContainer.innerHTML = "<p> No meals found !</p>";
  }
}

// Check if the meal is already in favorites
function isFavorite(mealId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(String(mealId)); // Convert to string for consistency
}

// Add to Favorite
function toggleFavorite(mealId, button) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(String(mealId))) {
    // Remove from favorites
    favorites = favorites.filter((id) => id !== String(mealId));
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Change button back to original state
    button.textContent = "Add to Favourites";
    button.classList.remove("btn-danger");
    button.classList.add("btn-primary");
  } else {
    // Add to favorites
    favorites.push(String(mealId));
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Change button to "Remove from Favourites" state
    button.textContent = "Remove from Favourites";
    button.classList.remove("btn-primary");
    button.classList.add("btn-danger");
  }
}
