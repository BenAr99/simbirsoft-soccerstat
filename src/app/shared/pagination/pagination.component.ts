import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PagePaginationPipe } from './page-pagination.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [PagePaginationPipe, JsonPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @Input() count?: number;
  currentPage = 1;
  maxPage = 5;
  perPage = 10;
  pages: number[] = [];
  // maxLists: number = 5;
  ngOnChanges(changes: SimpleChanges<PaginationComponent>): void {
    if (changes.count?.currentValue !== changes.count?.previousValue && this.count) {
      const testCeil = Math.ceil(this.count / this.perPage);
      this.pages = new Array(testCeil).fill(0);
      this.pages = this.pages.map((data, index) => {
        return index + 1;
      });
      console.log(this.pages);
      console.log(this.count);
    }
  }
}
