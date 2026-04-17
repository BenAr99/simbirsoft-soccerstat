import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { League, LeaguesMatchesResponse, LeaguesResponse } from './leagues.contact';
import { Match } from '../calendar/calendar.contract';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  private http = inject(HttpClient);

  getLeagues(): Observable<League[]> {
    return this.http.get<LeaguesResponse>('https://api.football-data.org/v4/competitions').pipe(
      map((response) => {
        return response.competitions;
      }),
    );
  }

  getMatches(id: string): Observable<Match[]> {
    return this.http
      .get<LeaguesMatchesResponse>(`https://api.football-data.org/v4/competitions/${id}/matches`)
      .pipe(
        map((response) => {
          return response.matches.map((match) => {
            return {
              date: match.utcDate,
              status: match.status,
              home: {
                name: match.homeTeam.name,
                fullTimeScore: match.score.fullTime?.home ?? undefined,
                halfTimeScore: match.score.halfTime?.home ?? undefined,
                penalties: match.score.penalties?.home ?? undefined,
              },
              away: {
                name: match.awayTeam.name,
                fullTimeScore: match.score.fullTime?.away ?? undefined,
                halfTimeScore: match.score.halfTime?.away ?? undefined,
                penalties: match.score.penalties?.away ?? undefined,
              },
            };
          });
        }),
      );
  }
}
