import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PagePaginationPipe } from './page-pagination.pipe';
import { COUNT_PER_PAGE_TOKEN } from './page-pagination.token';

@Component({
  selector: 'app-pagination',
  imports: [PagePaginationPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent<T> implements OnChanges {
  @Input() count = 0;
  @Output() range = new EventEmitter<[number, number]>();

  maxPagesView = 5;

  pages: number[] = [];

  currentPage = 1;

  perPage = inject(COUNT_PER_PAGE_TOKEN);

  ngOnChanges(changes: SimpleChanges<PaginationComponent<T>>): void {
    console.log(this.count);

    if (changes.count?.currentValue !== undefined) {
      this.currentPage = 1;

      const count = Math.ceil(this.count / this.perPage);
      this.pages = new Array(count).fill(0);
      this.pages = this.pages.map((_, index) => {
        return index + 1;
      });

      this.emitRangeChange();
    }
  }

  prevPage(): void {
    this.currentPage = this.currentPage - 1;
    this.emitRangeChange();
  }

  nextPage(): void {
    this.currentPage = this.currentPage + 1;
    this.emitRangeChange();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.emitRangeChange();
  }

  private emitRangeChange(): void {
    const end = this.currentPage * this.perPage;
    const start = end - this.perPage;

    this.range.emit([start, end]);
  }
}
