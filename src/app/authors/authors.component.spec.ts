import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
import { InputComponent } from '../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorsComponent, InputComponent],
      imports:[CommonModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value when onValueChange is called', () => {
    const value = 'Test Value';
    const valueChangeSpy = spyOn(component.valueChange, 'emit');

    component.value = value;
    component.onValueChange();

    expect(valueChangeSpy).toHaveBeenCalledWith(value);
  });
});
