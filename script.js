const form = document.getElementById("recipeForm");
const recipesContainer = document.getElementById("recipes");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function renderRecipes() {
  recipesContainer.innerHTML = "";
  recipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Description:</strong> ${recipe.description}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button class="share-btn" onclick="shareRecipe(${index})">Share</button>
    `;

    recipesContainer.appendChild(card);
  });
}

function shareRecipe(index) {
  const recipe = recipes[index];
  const shareData = {
    title: recipe.title,
    text: `${recipe.title} - ${recipe.description}\nInstructions: ${recipe.instructions}`,
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Shared successfully!'))
      .catch(err => console.error('Error sharing:', err));
  } else {
    alert("Sharing not supported on this device.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const instructions = document.getElementById("instructions").value.trim();

  if (title && description && instructions) {
    const newRecipe = { title, description, instructions };
    recipes.unshift(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    form.reset();
    renderRecipes();
  }
});

renderRecipes();
