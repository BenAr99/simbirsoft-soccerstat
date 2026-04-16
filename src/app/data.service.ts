import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  getData(): Observable<object> {
    return this.http
      .get('https://api.football-data.org/v4/teams/1/matches', {
        headers: {
          'X-Auth-Token': 'e113416506b94befada60c5b3db3b42f',
        },
      })
      .pipe();
  }
}
