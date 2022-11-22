import View from './View.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  //the publisher function
  addHandlerRender(handler) {
    this._parentEl.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = btn.dataset.goto;
      handler(+gotoPage);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;
    // if page 1 , other pages
    if (currPage == 1 && numPages > 1) {
      return `${this._generateMarkupBtn(currPage + 1, 'right')}`;
    }
    //if page 1 , no other pages
    if (currPage == 1 && numPages == 1) return ``;
    //if last page
    if (currPage == numPages)
      return `${this._generateMarkupBtn(currPage - 1, 'left')}`;
    //other page
    if (currPage > 1 && currPage < numPages)
      return `${this._generateMarkupBtn(
        currPage - 1,
        'left'
      )}${this._generateMarkupBtn(currPage + 1, 'right')}`;
  }
  _generateMarkupBtn(gotoPage, arrowDirection) {
    return `<button data-goto =${gotoPage} class="btn--inline pagination__btn--${
      arrowDirection === 'left' ? 'prev' : 'next'
    }">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${arrowDirection}"></use>
    </svg>
    <span>Page ${gotoPage}</span>
  </button>`;
  }
}

export default new PaginationView();
