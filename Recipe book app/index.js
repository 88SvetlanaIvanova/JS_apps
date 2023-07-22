const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(){
  recipeListEl.innerHTML = [];
  recipes.forEach(recipe => {
    const recipeItemEl = document.createElement("li")
    recipeItemEl.classList.add("recipe-item");

    recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image"; 
    
    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerHTML = recipe.title;

    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
      <strong>Ingredients:</strong> ${recipe.extendIngredients.
        map((ingredient)=> ingredient.original).join(", ")}
    `;

    recipeLinkEl = document.createElement("a");
    recipeLinkEl = recipe.sourceUrl;
    recipeLinkEl.innreText = "View recipe";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });

}

async function getRecipes(){
  const response = await fetch( 
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
  
  const data = await response.json();
  
  return data.recipes;
}


async function init(){
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();