import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { InputComponent } from '../shared/input/input.component';
import { TeamsService } from './teams.service';
import { Teams, TeamsResponse } from './teams.contract';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { COUNT_PER_PAGE_TOKEN } from '../shared/pagination/page-pagination.token';

@Component({
  selector: 'app-teams',
  imports: [CardComponent, InputComponent, PaginationComponent, AsyncPipe],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent implements OnInit {
  allTeams: Teams[] = [];
  paginationChange = new BehaviorSubject<Teams[]>([]);
  perPage = inject(COUNT_PER_PAGE_TOKEN);

  private teamsService = inject(TeamsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.teamsService
      .getTeams()
      .pipe(startWith<Teams[]>([]))
      .subscribe((teams) => {
        this.allTeams = teams;
        this.change([0, this.perPage]);
      });
  }

  navigationToCalendar(id: string): void {
    this.router.navigate([`/calendar/teams/${id}`]);
  }

  change($event: [number, number]): void {
    this.paginationChange.next(this.allTeams.slice($event[0], $event[1]));
  }
}
