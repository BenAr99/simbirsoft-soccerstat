export interface Teams {
  crest: string;
  id: string;
  name: string;
}

export interface TeamsResponse {
  teams: Teams[];
  count: number;
}
