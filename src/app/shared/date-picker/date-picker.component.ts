import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  value: Date | null = null;
  disabled = false;
  private onChange!: (value: Date | null) => void;
  private onTouched!: () => void;

  writeValue(value: Date | null): void {
    this.value = value || null;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  showPicker(element: HTMLInputElement): void {
    element.showPicker();
  }

  blockInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value ? new Date(target.value) : null;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
