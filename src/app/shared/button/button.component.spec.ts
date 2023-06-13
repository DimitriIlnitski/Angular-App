import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { AppModule } from 'src/app/app.module';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.buttonTypes).toEqual('');
    expect(component.buttonText).toEqual('Default Text');
    expect(component.iconType).toEqual(faQuestion);
    expect(component.iconClass).toEqual('');
    expect(component.toShow).toEqual(false);
  });

  it('should emit event when clickHandler is called', () => {
    spyOn(component.buttonClick, 'emit');
    component.clickHandler();
    fixture.detectChanges();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
