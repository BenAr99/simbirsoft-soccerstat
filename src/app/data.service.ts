import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  getData(): Observable<object> {
    return this.http
      .get('https://api.football-data.org/v4/teams/5/matches?date=2025-07-16', {
        headers: {
          'X-Auth-Token': 'e113416506b94befada60c5b3db3b42f',
        },
      })
      .pipe(
        map((response) => {
          console.log(response);
          // @ts-ignore
          return response.matches.map((match) => {
            return match.score;
          });
        }),
      );
  }
}
