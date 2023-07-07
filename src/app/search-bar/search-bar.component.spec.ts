import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent, InputComponent, ButtonComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search value change event', () => {
    const value = 'angular';
    spyOn(component.searchValueChange, 'emit');
    component.handleInputValueChange(value);
    expect(component.searchValueChange.emit).toHaveBeenCalledWith(value);
  });

  it('should emit button click event', () => {
    spyOn(component.buttonClick, 'emit');
    component.handleButtonClick();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
