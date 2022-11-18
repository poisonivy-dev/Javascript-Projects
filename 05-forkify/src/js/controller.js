// import icons from '../img/icons.svg'; //---Parcel 1
import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    //look for id in the hash
    const id = window.location.hash.slice(1);
    //1) loading recipe
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    //2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err.message);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Get Query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    //1) Load Results
    await model.loadSearchResults(query);

    //2) render result
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err.message);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
};
init();
