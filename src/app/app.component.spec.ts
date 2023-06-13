import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [RouterTestingModule, AppModule],
    declarations: [AppComponent]
  });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
});

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-app');
  });

  it('should log on all lifecycle methods',()=>{
    spyOn(console, 'log');
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalled();
  })
});
