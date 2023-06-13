import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import { AppModule } from '../app.module';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should have faUser icon initialized', () => {
      expect(component.faUser).toEqual(faUser);
    });

    it('should have faRightFromBracket icon initialized', () => {
      expect(component.faRightFromBracket).toEqual(faRightFromBracket);
    });
});
