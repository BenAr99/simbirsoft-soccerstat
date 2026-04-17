import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { League, LeaguesMatchesResponse, LeaguesResponse } from './leagues.contact';
import { MatchCalendar } from '../calendar/calendar.contract';

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

  getMatches(id: string, startDate: Date | null, endDate: Date | null): Observable<MatchCalendar> {
    const startDateParam = startDate ? `&dateFrom=${startDate.toISOString().split('T')[0]}` : '';
    const endDateParam = endDate ? `&dateTo=${endDate.toISOString().split('T')[0]}` : '';

    return this.http
      .get<LeaguesMatchesResponse>(
        `https://api.football-data.org/v4/competitions/${id}/matches?${startDateParam}&${endDateParam}`,
      )
      .pipe(
        map((response) => {
          return {
            name: response.competition.name,
            matches: response.matches.map((match) => {
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
