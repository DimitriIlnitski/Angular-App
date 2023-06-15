import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AppComponent],
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should log on all lifecycle methods', () => {
    spyOn(console, 'log');
    app.ngOnChanges();
    app.ngOnInit();
    app.ngDoCheck();
    app.ngAfterContentInit();
    app.ngAfterContentChecked();
    app.ngAfterViewInit();
    app.ngAfterViewChecked();
    app.ngOnDestroy();
    expect(console.log).toHaveBeenCalledWith('ngOnChanges');
    expect(console.log).toHaveBeenCalledWith('ngOnInit');
    expect(console.log).toHaveBeenCalledWith('ngDoCheck');
    expect(console.log).toHaveBeenCalledWith('ngAfterContentInit');
    expect(console.log).toHaveBeenCalledWith('ngAfterContentChecked');
    expect(console.log).toHaveBeenCalledWith('ngAfterViewInit');
    expect(console.log).toHaveBeenCalledWith('ngAfterViewChecked');
    expect(console.log).toHaveBeenCalledWith('ngOnDestroy');
  });
});
