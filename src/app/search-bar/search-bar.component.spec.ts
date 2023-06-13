import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { AppModule } from '../app.module';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [SearchBarComponent],
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have inputValue empty by default', () => {
    expect(component.inputValue).toBe('');
  });

  it('should update inputValue when handleValueChange is called', () => {
    const testValue = 'test';
    component.handleValueChange(testValue);
    expect(component.inputValue).toBe(testValue);
  });

  it('should log inputValue when handleClick is called', () => {
    const testValue = 'test';
    component.inputValue = testValue;
    spyOn(console, 'log');
    component.handleClick();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(testValue);
  });
});
