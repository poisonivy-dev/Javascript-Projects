import View from './View.js';
class PreviewView extends View {
  _generateMarkupPreview(rec) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      rec.id === id ? 'preview__link--active' : ''
    }" href="#${rec.id}">
      <figure class="preview__fig">
        <img src="${rec.image}" alt="${rec.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${rec.title}</h4>
        <p class="preview__publisher">${rec.publisher}</p>
 
      </div>
    </a>
  </li>`;
  }
}

export default new PreviewView();
