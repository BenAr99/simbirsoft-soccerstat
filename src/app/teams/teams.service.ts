import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { TeamMatchesResponse, Teams, TeamsResponse } from './teams.contract';
import { CalendarService, MatchCalendar } from '../calendar/calendar.contract';

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

  getTeam(id: string): Observable<Teams> {
    return this.http
      .get<Teams>(`https://api.football-data.org/v4/teams/${id}`)
      .pipe(map((response) => response));
  }

  getMatches(id: string, startDate: Date | null, endDate: Date | null): Observable<MatchCalendar> {
    const startDateParam = startDate ? `&dateFrom=${startDate.toISOString().split('T')[0]}` : '';
    const endDateParam = endDate ? `&dateTo=${endDate.toISOString().split('T')[0]}` : '';

    return forkJoin([
      this.http.get<TeamMatchesResponse>(
        `https://api.football-data.org/v4/teams/${id}/matches?${startDateParam}&${endDateParam}`,
      ),
      this.getTeam(id),
    ]).pipe(
      map(([matches, team]) => {
        return {
          name: team.name,
          matches: matches.matches.map((match) => {
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
          }),
        };
      }),
    );
  }
}
