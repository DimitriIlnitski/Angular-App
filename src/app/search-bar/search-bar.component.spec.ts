import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { AppModule } from '../app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InputComponent } from '../shared/input/input.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [SearchBarComponent, InputComponent],
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
