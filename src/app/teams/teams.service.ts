import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TeamMatchesResponse, Teams, TeamsResponse } from './teams.contract';
import { CalendarService, Match } from '../calendar/calendar.contract';

@Injectable({
  providedIn: 'root',
})
export class TeamsService implements CalendarService {
  private http = inject(HttpClient);

  getTeams(): Observable<Teams[]> {
    return this.http
      .get<TeamsResponse>('https://api.football-data.org/v4/teams')
      .pipe(map((response) => response.teams));
  }

  getMatches(id: string): Observable<Match[]> {
    return this.http
      .get<TeamMatchesResponse>(`https://api.football-data.org/v4/teams/${id}/matches`)
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
