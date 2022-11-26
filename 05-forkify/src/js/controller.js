// import icons from '../img/icons.svg'; //---Parcel 1
import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    //look for id in the hash
    const id = window.location.hash.slice(1);

    if (!id) return;
    //0) update sidebar
    resultsView.update(model.loadPageResults());
    //update the bookmark
    bookmarksView.update(model.state.bookmarks);
    //1) loading recipe
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
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  //add bookmark to state
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  //change the bookmark view
  bookmarksView.render(model.state.bookmarks);
};
const controlLoadBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (data) {
  console.log(data);
};
const init = function () {
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.addHandlerRender(controlLoadBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();
