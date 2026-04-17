import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('simbirsoft-soccerstat');
  private dataService = inject(DataService);

  constructor() {
    // this.dataService.getData().subscribe((data) => {
    //   console.log(data);
    // });
  }
}
