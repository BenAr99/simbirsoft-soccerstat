import { Status } from '../calendar/calendar.contract';

export interface League {
  area: {
    code: string;
    flag: string;
    id: string;
    name: string;
  };
  code: string;
  emblem: string;
  id: string;
  name: string;
}

export interface LeaguesResponse {
  competitions: League[];
  count: number;
}

export interface LeaguesMatchesResponse {
  competition: { name: string };

  matches: [
    {
      homeTeam: {
        name: string;
      };
      awayTeam: {
        name: string;
      };
      utcDate: Date;
      penalties: number[];
      status: Status;
      score: {
        fullTime?: {
          home?: number;
          away?: number;
        };
        halfTime?: {
          home?: number;
          away?: number;
        };
        penalties?: {
          home?: number;
          away?: number;
        };
      };
    },
  ];
}
