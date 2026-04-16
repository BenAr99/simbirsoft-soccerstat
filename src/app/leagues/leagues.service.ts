import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { League, LeaguesResponse } from './leagues.contact';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  private http = inject(HttpClient);

  getLeagues(): Observable<League[]> {
    return this.http
      .get<LeaguesResponse>('https://api.football-data.org/v4/competitions', {
        headers: {
          'X-Auth-Token': 'e113416506b94befada60c5b3db3b42f',
        },
      })
      .pipe(
        map((response) => {
          return response.competitions;
        }),
      );
  }
}
