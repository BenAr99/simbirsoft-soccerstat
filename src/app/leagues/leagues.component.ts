import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { LeaguesService } from './leagues.service';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { League } from './leagues.contact';
import { CardComponent } from '../shared/card/card.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leagues',
  imports: [InputComponent, CardComponent, PaginationComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaguesComponent implements OnInit {
  view: Observable<League[]> = of([]);
  searchControl = new FormControl<string>('', { nonNullable: true });

  private leaguesService = inject(LeaguesService);
  private router = inject(Router);
  private all: League[] = [];

  paginationSubject = new BehaviorSubject<[number, number]>([0, 10]);
  countSubject = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    const leagues$ = this.leaguesService.getLeagues();

    this.view = leagues$.pipe(
      switchMap((leagues) => {
        this.all = leagues;

        return combineLatest([
          this.searchControl.valueChanges.pipe(startWith('')),
          this.paginationSubject,
        ]);
      }),
      map(([searchTerm, [start, end]]) => {
        const filtered = this.all.filter(
          (league) => !searchTerm || league.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        this.countSubject.next(filtered.length);

        return filtered.slice(start, end);
      }),
    );
  }

  navigationToCalendar(id: string): void {
    this.router.navigate([`/calendar/leagues/${id}`]);
  }

  onPageChange(page: [number, number]): void {
    this.paginationSubject.next(page);
  }
}
