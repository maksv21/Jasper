export class TemplateAbout {
  static getPage() {
    return `
    <div class="w-100">
    <div class="d-flex justify-content-center">
      <div class="w-75">
      <h5>Main features</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Rendering a goods</li>
        <li class="list-group-item">Detail information for a products</li>
        <li class="list-group-item">Multilingual support</li>
        <li class="list-group-item">Cart and checkout</li>
        <li class="list-group-item">The engine for rendering pages over products, for example detailed information</li>  
      </ul>
      
      <h5 class="mt-5">Other</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Saving page after reload, open product in new tab</li>
        <li class="list-group-item">Pagination</li>
        <li class="list-group-item">Order sending to telegram, bot: @orders2telegramBot</li>
        <li class="list-group-item">Filters that are updated for each category and search</li>
        <li class="list-group-item">Sorting</li>
        <li class="list-group-item">Multi tab support (adding product on one page auto update other)</li>
        <li class="list-group-item">Search on EN / RU</li>
        <li class="list-group-item">Search on different layouts ("cat" == "сфе")</li>
        <li class="list-group-item">Search transliteration ("cat" == "кэт")</li>
        <li class="list-group-item">Search for a specific category</li>
        <li class="list-group-item">Search by id opens product</li>
      </ul>
    </div>
    </div>
`;
  }
}
