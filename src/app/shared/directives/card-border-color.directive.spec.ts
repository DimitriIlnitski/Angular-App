import { CardBorderColorDirective } from './card-border-color.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<article
    class="course-card"
    [appCardBorderColor]="creationDate"
  ></article>`,
})
class TestHostComponent {
  creationDate = '';
}

describe('CardBorderColorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, CardBorderColorDirective],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new CardBorderColorDirective();
    expect(directive).toBeTruthy();
  });

  it('should add green border class if course date is less than 14 days old', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    component.creationDate = twoDaysAgo.toString();
    fixture.detectChanges();

    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    expect(article.className).toContain('green-border');
  });

  it('should add blue border class if course date is in the future', () => {
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    component.creationDate = twoDaysFromNow.toString();
    fixture.detectChanges();

    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    expect(article.className).toContain('blue-border');
  });

  it('should not add any border class if course date is more than 14 days old', () => {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    component.creationDate = monthAgo.toString();
    fixture.detectChanges();

    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    expect(article.className).not.toContain('green-border');
    expect(article.className).not.toContain('blue-border');
  });
});
