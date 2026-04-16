import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagePagination',
})
export class PagePaginationPipe implements PipeTransform {
  transform(value: number[], currentPage: number, maxPage: number): number[] {
    const pages = Math.ceil(currentPage / maxPage);
    return value.slice(maxPage * (pages - 1), maxPage * pages);
  }
}
