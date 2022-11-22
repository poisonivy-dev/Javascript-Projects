class SearchView {
  #parentEl = document.querySelector('.search');
  addHandlerRender(handler) {
    this.#parentEl.addEventListener('submit', function (ev) {
      ev.preventDefault();
      handler();
    });
  }
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
