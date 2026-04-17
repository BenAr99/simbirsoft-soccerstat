import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CALENDAR_SERVICE_TOKEN } from './calendar.token';
import { combineLatest, filter, map, startWith, switchMap } from 'rxjs';
import { CalendarService } from './calendar.contract';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  imports: [
    AsyncPipe,
    DatePipe,
    PaginationComponent,
    PaginationComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  name?: string;
  type?: string;
  path?: string;

  private activatedRoute = inject(ActivatedRoute);
  private calendarService = inject<CalendarService>(CALENDAR_SERVICE_TOKEN);
  private route = inject(ActivatedRoute);

  startDateControl = new FormControl<Date | null>(null, { nonNullable: false });
  endDateControl = new FormControl<Date | null>(null, { nonNullable: false });

  $matches = combineLatest([
    this.activatedRoute.params,
    this.startDateControl.valueChanges.pipe(startWith(this.startDateControl.value)),
    this.endDateControl.valueChanges.pipe(startWith(this.endDateControl.value)),
  ]).pipe(
    filter(() => {
      const startDate = this.startDateControl.value;
      const endDate = this.endDateControl.value;
      return (startDate === null && endDate === null) || Boolean(startDate && endDate);
    }),
    switchMap(([params, startDate, endDate]) => {
      return this.calendarService.getMatches(params['id'], startDate, endDate);
    }),
    map((matchCalendar) => {
      this.name = matchCalendar.name;
      this.type = this.route.snapshot.data['navigationName'];
      this.path = this.route.snapshot.data['path'];
      console.log(matchCalendar.matches);

      return matchCalendar.matches;
    }),
  );
}
