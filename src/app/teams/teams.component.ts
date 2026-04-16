import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { InputComponent } from '../shared/input/input.component';
import { Observable } from 'rxjs';
import { TeamsService } from './teams.service';
import { Teams } from './teams.contract';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  imports: [AsyncPipe, CardComponent, InputComponent, PaginationComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent {
  private teams = inject(TeamsService);
  private router = inject(Router);
  $teams: Observable<Teams[]>;

  constructor() {
    this.teams.getTeams().subscribe((data) => {
      console.log(data.length);
    });

    this.$teams = this.teams.getTeams();
  }

  navigationToCalendar(id: string): void {
    this.router.navigate([`/calendar/teams/${id}`]);
  }
}
