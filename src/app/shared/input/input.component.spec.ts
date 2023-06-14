import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let el: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [InputComponent],
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.labelText).toEqual('');
    expect(component.labelClass).toEqual('');
    expect(component.placeholderText).toEqual('');
    expect(component.idInput).toEqual('');
    expect(component.value).toEqual('');
  });

  it('should emit correct value when onValueChange is called', () => {
    spyOn(component.valueChange, 'emit');

    component.value = 'test';
    component.onValueChange();

    expect(component.valueChange.emit).toHaveBeenCalledWith('test');
  });

  it('should emit correct value when input made', () => {
    const input = el.query(By.css('.input-field')).nativeElement;

    spyOn(component.valueChange, 'emit');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith('test');
  });
});
