// Fetch meal details by ID from the API
async function fetchMealById(mealId) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  return data.meals[0]; // Return the meal object
}

// Display all favorite meals stored in localStorage
async function displayFavourites() {
  const favouritesList = document.getElementById("favouritesList");
  const favouriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favouriteIds.length === 0) {
    favouritesList.innerHTML = `
      <div class="col-12 text-center">
        <p class="fs-4 text-muted">No favourites added yet.</p>
      </div>`;
    return;
  }

  // Fetch details of all meals
  const meals = await Promise.all(favouriteIds.map((id) => fetchMealById(id)));

  // Render the meals in a grid layout
  favouritesList.innerHTML = meals
    .map(
      (meal) => `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow border-0">
            <img 
              src="${meal.strMealThumb}" 
              class="card-img-top" 
              alt="${meal.strMeal}" 
              style="max-height: 200px; object-fit: cover;"
            >
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <button 
                class="btn btn-danger w-100 mt-3" 
                onclick="removeFromFavourites('${meal.idMeal}')">
                Remove from Favorites
              </button>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

// Remove a meal from favorites and update the display
function removeFromFavourites(mealId) {
  let favouriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
  favouriteIds = favouriteIds.filter((id) => id !== mealId);
  localStorage.setItem("favorites", JSON.stringify(favouriteIds));
  displayFavourites(); // Refresh the displayed list
}

// Initial call to display the favorite meals
displayFavourites();
