import View from './View.js';
class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }
  _toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (ev) {
      ev.preventDefault();
      //API to fetch form data --accepts a form
      const data = [...new FormData(this)];
      // Converts entries to object

      handler(Object.fromEntries(data));
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
