export interface CalendarService {
  getCalendar(id: string): any;
}

export interface Calendar {
  date: Date;
  status: Status;
  awayTeam: string;
  homeTeam: string;
}

export interface score {
  fullTime: number;
  halfTime: number;

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
