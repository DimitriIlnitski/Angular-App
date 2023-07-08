import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageNotFoundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the "Page not Found!" message', () => {
    const element: HTMLElement = fixture.nativeElement;
    const message = element.querySelector(
      '.page-not-founded > div'
    )?.textContent;

    expect(message).toContain('Page not Found!');
  });

  it('should have a link to the courses page', () => {
    const element: HTMLElement = fixture.nativeElement;
    const link = element.querySelector(
      '.page-not-founded a'
    ) as HTMLAnchorElement;

    expect(link.textContent).toContain('Go to Courses Page');
    expect(link.getAttribute('routerLink')).toBe('/courses');
  });
});
