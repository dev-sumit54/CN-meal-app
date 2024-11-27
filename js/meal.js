// meal.js
const mealDetail = document.getElementById("mealDetail");
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("id");

async function fetchMealDetails() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  const meal = data.meals[0];

  mealDetail.innerHTML = `
<div class="card w-75 mx-auto">
    <div class="row g-0 align-items-center">
      <div class="col-md-4 text-center">
        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${
    meal.strMeal
  }" style="max-height: 300px; object-fit: cover;">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title">${meal.strMeal}</h3>
          <p class="card-text">${meal.strInstructions}</p>
          <button class="btn ${
            isFavorite(mealId) ? "btn-success" : "btn-primary"
          }" 
                                    id="fav-btn-${mealId}" 
                                    onclick="toggleFavorite(${mealId}, this)">
                                ${
                                  isFavorite(mealId)
                                    ? "Remove from Favourites"
                                    : "Add to Favourites"
                                }
                            </button>
        </div>
      </div>
    </div>
  </div>
    `;
}

fetchMealDetails();

function isFavorite(mealId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(mealId);
}

// Shared toggleFavorite Logic
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
