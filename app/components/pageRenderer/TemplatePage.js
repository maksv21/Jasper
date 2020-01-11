export class TemplatePage {
  getPage({title, HTML}) {
    return `
    <h2 class="detailed-info-title px-4">
      <i class="material-icons text-btn back-btn">arrow_back</i>
      ${title}
    </h2>
    <div class="page-content px-4">${HTML}</div>    
`
  }
}
