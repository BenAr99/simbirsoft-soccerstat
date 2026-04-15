import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getData() {
    this.http.get('https://api.football-data.org/v4/matches')
  }
}
