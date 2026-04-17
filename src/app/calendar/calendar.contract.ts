import { Observable } from 'rxjs';

export interface CalendarService {
  getMatches(id: string, startDate: Date | null, endDate: Date | null): Observable<MatchCalendar>;
}

export interface MatchCalendar {
  name: string;
  matches: Match[];
}

export interface Match {
  date: Date;
  status: Status;
  home: MatchTeamData;
  away: MatchTeamData;
}

export interface MatchTeamData {
  name: string;
  fullTimeScore?: number;
  halfTimeScore?: number;
  penalties?: number;
}

export enum Status {
  SCHEDULED,
  LIVE,
  IN_PLAY,
  PAUSED,
  FINISHED,
  POSTPONED,
  SUSPENDED,
  CANCELED,
}
