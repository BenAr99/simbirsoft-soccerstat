import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CALENDAR_SERVICE_TOKEN } from './calendar.token';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  private activatedRoute = inject(ActivatedRoute);
  private calendarService = inject(CALENDAR_SERVICE_TOKEN);
}
