import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  errorMessage = new BehaviorSubject<string | null>(null);

  showError(message: string, duration = 5000): void {
    this.errorMessage.next(message);

    setTimeout(() => {
      this.clearError();
    }, duration);
  }

  clearError(): void {
    this.errorMessage.next(null);
  }
}
