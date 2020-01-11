import {Localizer} from "../share/Localizer.js";

export class TemplateHeader {
  _local = new Localizer();

  getHeaderTemplate(currentLang) {
    return `
      <div class="collapse categories" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <a class="btn btn-link navbar-btn" href="javascript:;" 
          data-action="category" data-category="all">${this._local.get('all_category')}</a>
          
          <br><a class="btn btn-link navbar-btn" href="javascript:;" 
          data-action="category" data-category="dog">${this._local.get('dog_category')}</a>
          
          <br><a class="btn btn-link navbar-btn" href="javascript:;"
          data-action="category" data-category="cat">${this._local.get('cat_category')}</a>
          
          <br><a class="btn btn-link navbar-btn" href="javascript:;"
          data-action="category" data-category="fish">${this._local.get('fish_category')}</a>
          
          <br><a class="btn btn-link navbar-btn" href="javascript:;"
          data-action="category" data-category="bird">${this._local.get('bird_category')}</a>
        </div>
      </div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark justify-content-center">
        <div class="d-flex align-items-center max-width-container">
          <div class="d-flex flex-grow-1">
                  

            <a class="nav-link" href="javascript:;" data-toggle="collapse" data-target=".categories">
                <i class="material-icons navbar-btn navbar-icon">view_headline</i>
            </a>
              
            <div class="btn navbar-brand" data-action="go-home">
              <img class="navbar-logo" src="app/graphics/logo_line.png" alt="Jasper">
            </div>
        
            <form class="mr-2 my-auto w-100 d-inline-block order-1 products-search-form">
              <div class="input-group">
                  <input name="search" type="search" class="form-control border border-right-0 search-input" 
                  placeholder="${this._local.get('search', 'action')}" autofocus>
                  <div class="input-group-append btn-group">
                    <button class="search-category btn btn-outline-light border border-left-0 dropdown-toggle" 
                      type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-category="all">
                      ${this._local.get('all_category')}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="javascript:;" data-action="search-category"
                      data-category="all">${this._local.get('all_category')}</a>
                      <a class="dropdown-item" href="javascript:;" data-action="search-category"
                      data-category="dog">${this._local.get('dog_category')}</a>
                      <a class="dropdown-item" href="javascript:;" data-action="search-category"
                      data-category="cat">${this._local.get('cat_category')}</a>
                      <a class="dropdown-item" href="javascript:;" data-action="search-category"
                      data-category="fish">${this._local.get('fish_category')}</a>
                      <a class="dropdown-item" href="javascript:;" data-action="search-category"
                      data-category="bird">${this._local.get('bird_category')}</a>
                    </div>
                  </div>
                  <span class="input-group-append">
                    <button class="btn btn-outline-light border border-left-0 search-btn" type="submit">
                    ${this._local.get('search')}
                  </button>
                </span>
              </div>
            </form>
        
          </div>
          <div class="navbar-collapse collapse flex-shrink-1 flex-grow-0 order-last" id="navbar7">
            <div class="d-flex align-items-center justify-content-start">

              <input class="btn btn-link navbar-btn" type="button" data-action="page" 
              value="${this._local.get('delivery')}">
              <input class="btn btn-link navbar-btn" type="button" data-action="page" 
              value="${this._local.get('contacts')}">
              <input class="btn btn-link navbar-btn" type="button" data-action="page" 
              value="${this._local.get('about')}">
              <input class="btn btn-link navbar-btn" type="button" data-action="help" 
              value="${this._local.get('help')}">
  
              <a class="nav-link" href="javascript:;">
                <i class="material-icons navbar-btn navbar-icon" data-action="cart">shopping_cart</i>
              </a>
  
              <div class="navbar-lang">
                <input class="btn btn-link navbar-btn navbar-lang" type="button" value="RU" data-action="ru" 
                ${currentLang === 'ru' ? 'disabled' : ''}>|
                <input class="btn btn-link navbar-btn navbar-lang" type="button" value="EN" data-action="en"
                ${currentLang === 'en' ? 'disabled' : ''}>
              </div>
            </div>
          </div>
        </div>
      </nav>
`
  }
}
