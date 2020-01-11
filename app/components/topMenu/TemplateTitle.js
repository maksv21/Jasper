export class TemplateTitle {
  getHomeIcon() {
    return '<i class="material-icons text-btn home-icon pl-3" data-id="title">home</i>'
  }

  getNextTitle({title, isButton, id}) {
    return `
    <i class="material-icons">keyboard_arrow_right</i>
    <span class="${isButton ? 'text-btn btn-link' : ''}" data-id="${id}">${title}</span>
    `
  }
}