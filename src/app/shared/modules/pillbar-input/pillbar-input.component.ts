import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PillbarInputComponent),
  multi: true,
};
@Component({
  selector: 'app-pillbar-input',
  templateUrl: 'pillbar-input.component.html',
  styleUrls: ['./pillbar-input.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class PillbarInputComponent implements OnInit, ControlValueAccessor {
  @Input() possibleValues: any[] = [];

  @Input() label: string = '';
  public searchField: string = '';

  public availablePills: any[] = [];
  public selectedPills: any[] = [];

  onChange = (value: any) => { };
  onTouched = () => { };

  public value: any;
  public touched = false;
  public disabled = false;

  constructor() { }

  ngOnInit() { }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public searchPills() {
    this.availablePills = [];
    if (this.searchField.length > 0) {
      const nameRuList = this.selectedPills;
      const possibleList = this.possibleValues.filter((x) => !nameRuList.includes(x))

      this.availablePills = possibleList.filter((x: any) =>
        (x.toLowerCase().includes(this.searchField.toLowerCase()) || x.toLowerCase().includes(this.searchField.toLowerCase()))
      );
    }
  }

  public selectPill(pill: any) {
    this.markAsTouched();
    if (!this.disabled) {
      this.availablePills = this.availablePills.filter((x) => x !== pill);
      this.selectedPills.push(pill);

      // Записывает в FormControl
      this.onTouched();
      this.value = this.prepareToWriteValue();
      this.onChange(this.value);
    }
  }

  public unselectPill(pill: any) {
    this.markAsTouched();
    if (!this.disabled) {
      this.selectedPills = this.selectedPills.filter((x) => x !== pill);
      if (this.searchField.length > 1) this.availablePills.push(pill)

      // Записывает в FormControl
      this.onTouched();
      this.value = this.prepareToWriteValue();
      this.onChange(this.value);
    }
  }

  public prepareToWriteValue() {
    let result: string[] = [];
    this.selectedPills.map((x) => x).forEach(x => {
      result.push(x)
    });
    return result;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

