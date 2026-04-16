import { Routes } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LeaguesService } from './leagues/leagues.service';
import { CALENDAR_SERVICE_TOKEN } from './calendar/calendar.token';
import { TeamsService } from './teams/teams.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'leagues',
    pathMatch: 'full',
  },
  {
    path: 'leagues',
    component: LeaguesComponent,
  },
  {
    path: 'teams',
    component: TeamsComponent,
  },
  {
    path: 'calendar',
    children: [
      {
        path: 'leagues/:id',
        providers: [{ provide: CALENDAR_SERVICE_TOKEN, useExisting: LeaguesService }],
        component: CalendarComponent,
      },
      {
        path: 'teams/:id',
        providers: [{ provide: CALENDAR_SERVICE_TOKEN, useExisting: TeamsService }],
        component: CalendarComponent,
      },
    ],
  },
];
