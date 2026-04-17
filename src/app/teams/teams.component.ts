import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { InputComponent } from '../shared/input/input.component';
import { TeamsService } from './teams.service';
import { Teams } from './teams.contract';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  imports: [CardComponent, InputComponent, PaginationComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent implements OnInit {
  view: Observable<Teams[]> = of([]);
  searchControl = new FormControl<string>('', { nonNullable: true });

  private teamsService = inject(TeamsService);
  private router = inject(Router);
  private all: Teams[] = [];

  paginationSubject = new BehaviorSubject<[number, number]>([0, 10]);
  countSubject = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    const teams$ = this.teamsService.getTeams();

    this.view = teams$.pipe(
      switchMap((teams) => {
        this.all = teams;

        return combineLatest([
          this.searchControl.valueChanges.pipe(startWith('')),
          this.paginationSubject,
        ]);
      }),
      map(([searchTerm, [start, end]]) => {
        const filtered = this.all.filter(
          (team) => !searchTerm || team.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        this.countSubject.next(filtered.length);

        return filtered.slice(start, end);
      }),
    );
  }

  navigationToCalendar(id: string): void {
    this.router.navigate([`/calendar/teams/${id}`]);
  }

  onPageChange(page: [number, number]): void {
    this.paginationSubject.next(page);
  }
}
