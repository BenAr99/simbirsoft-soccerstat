import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CALENDAR_SERVICE_TOKEN } from './calendar.token';
import { switchMap } from 'rxjs';
import { CalendarService } from './calendar.contract';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';

@Component({
  selector: 'app-calendar',
  imports: [AsyncPipe, DatePipe, PaginationComponent, PaginationComponent, DatePickerComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  private activatedRoute = inject(ActivatedRoute);
  private calendarService = inject<CalendarService>(CALENDAR_SERVICE_TOKEN);

  $matches = this.activatedRoute.params.pipe(
    switchMap((params) => {
      return this.calendarService.getMatches(params['id']);
    }),
  );
}
