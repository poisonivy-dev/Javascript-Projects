// import icons from '../img/icons.svg'; //---Parcel 1
import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }
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
    // 1) Get Query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // 2) Load Results
    await model.loadSearchResults(query);

    // 3) render result
    // console.log(model.state.search.results);
    resultsView.render(model.loadPageResults());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err.message);
  }
};

const controlPagination = function (page) {
  resultsView.render(model.loadPageResults(page));
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  //update the recipe servings
  model.updateServings(servings);
  //update the recipe view
  recipeView.render(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
};
init();
