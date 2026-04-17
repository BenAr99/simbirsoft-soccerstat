import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from './shared/notification.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('simbirsoft-soccerstat');
  private notificationService = inject(NotificationService);
  $errorMessage: Observable<string | null>;
  constructor() {
    this.$errorMessage = this.notificationService.errorMessage;
  }
}
