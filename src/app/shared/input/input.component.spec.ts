import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { AppModule } from 'src/app/app.module';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [InputComponent],
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
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
});
