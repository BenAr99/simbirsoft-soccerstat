import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Teams, TeamsResponse } from './teams.contract';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private http = inject(HttpClient);

  getTeams(): Observable<Teams[]> {
    return this.http
      .get<TeamsResponse>('https://api.football-data.org/v4/teams', {
        headers: {
          'X-Auth-Token': 'e113416506b94befada60c5b3db3b42f',
        },
      })
      .pipe(
        map((response) => {
          console.log(response);
          return response.teams;
        }),
      );
  }
}
