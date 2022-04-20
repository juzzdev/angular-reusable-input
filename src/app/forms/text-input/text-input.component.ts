import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() valueHolder?: string;
  @Input() label!: string;
  @Input() type = 'text';
  @Input() readonly?: boolean;
  @Input() function?: string;
  @Output() keyUpEnter = new EventEmitter();
  input = new FormControl('')


  @ViewChild(FormControlDirective, {static: true})
      formControlDirective?: FormControlDirective;
      private value?: string;
      private disabled?: boolean;

  constructor(private controlContainer: ControlContainer) { }

  get control() {
    return this.formControl || this.controlContainer?.control?.get(this.formControlName);
  }

  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }
  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  public onKeyUpEnter(keyUpEnterEvent: Event): void {
    this.keyUpEnter.emit(keyUpEnterEvent);
  }
}
