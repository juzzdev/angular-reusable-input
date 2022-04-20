import { Component, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from 'src/app/model/selectoption';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectInputComponent,
      multi: true
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() label!: string;
  @Input() options!: SelectOption[];

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
}
