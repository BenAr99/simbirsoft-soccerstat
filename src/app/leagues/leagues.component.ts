import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { LeaguesService } from './leagues.service';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { League } from './leagues.contact';
import { CardComponent } from '../shared/card/card.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { COUNT_PER_PAGE_TOKEN } from '../shared/pagination/page-pagination.token';
import { Teams } from '../teams/teams.contract';

@Component({
  selector: 'app-leagues',
  imports: [InputComponent, AsyncPipe, CardComponent, PaginationComponent],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaguesComponent implements OnInit {
  allLeagues: League[] = [];
  paginationChange = new BehaviorSubject<League[]>([]);
  perPage = inject(COUNT_PER_PAGE_TOKEN);

  private leaguesService = inject(LeaguesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.leaguesService
      .getLeagues()
      .pipe(startWith<League[]>([]))
      .subscribe((leagues) => {
        this.allLeagues = leagues;
        this.change([0, this.perPage]);
      });
  }

  navigationToCalendar(id: string): void {
    this.router.navigate([`/calendar/leagues/${id}`]);
  }

  change($event: [number, number]): void {
    this.paginationChange.next(this.allLeagues.slice($event[0], $event[1]));
  }
}
