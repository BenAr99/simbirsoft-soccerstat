import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { LeaguesService } from './leagues.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { League } from './leagues.contact';
import { CardComponent } from '../shared/card/card.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leagues',
  imports: [InputComponent, AsyncPipe, CardComponent, PaginationComponent],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaguesComponent {
  private leaguesService = inject(LeaguesService);
  private router = inject(Router);
  $leagues: Observable<League[]>;

  constructor() {
    this.leaguesService.getLeagues().subscribe((data) => {
      console.log(data.length);
    });

    this.$leagues = this.leaguesService.getLeagues();
  }

  navigationToCalendar(id: string): void {
    this.router.navigate([`/calendar/leagues/${id}`]);
  }
}
