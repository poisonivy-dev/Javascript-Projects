// import icons from '../img/icons.svg'; //---Parcel 1
import * as model from './model.js';
import recipeView from './Views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Making the API call

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
  }
};
controlRecipes();

// ['hashchange', 'load'].forEach(ev => addEventListener(ev, controlRecipes));
window.addEventListener('hashchange', controlRecipes);
