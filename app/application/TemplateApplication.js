export class TemplateApplication {
  static getApplicationTemplate() {
    return `
    <div class="app-container">
      <div class="d-flex align-items-center flex-column bd-highlighta">
        <div class="d-flex justify-content-between align-items-end max-width-container top-menu">
          <h6 class="d-flex align-items-center current-title"></h6>
          <div class="sorting-container"></div>
        </div>
        <div class="max-width-container">
          <div class="detailed-info"></div>
          <div class="d-flex justify-content-start products">
            <div class="filters-container"></div>
            <main class="d-flex flex-column w-100">
              <div class="d-flex flex-wrap justify-content-center flex-fill products-container"></div>
              <div class="d-flex justify-content-center pagination mt-5 h-100 align-items-end"></div>
            </main>
          </div>
        </div>
      </div>
    </div>
    `
  }
}