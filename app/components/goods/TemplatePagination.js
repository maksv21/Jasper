export class TemplatePagination {
  static getPaginationTemplate(pageItem) {
    return `
      <li class="page-item ${pageItem.class ? pageItem.class : ''}" data-page="${pageItem.page}">
        <a class="page-link d-flex justify-content-center" href="javascript:;">${pageItem.value}</a>
      </li>`
  }

}
