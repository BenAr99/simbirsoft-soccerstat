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
