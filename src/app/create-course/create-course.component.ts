import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  createCourse,
  setStartZeroAndDirectToGetList,
  updateCourse,
} from '../store/app.actions';
import { selectItemById } from '../store/app.selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  course = {
    id: 0,
    name: '',
    date: '',
    length: '',
    description: '',
    authors: [],
    isTopRated: false,
  };

  shouldEdit = false;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.store.select(selectItemById(id)).pipe(
        map((course) => {
          if (course) {
            this.course.id = course.id;
            this.course.name = course.name;
            this.course.date = course.date;
            this.course.length = String(course.length);
            this.course.description = course.description;
            this.course.authors = [];
            this.course.isTopRated = course.isTopRated;
          }
        })
      );
      this.shouldEdit = true;
    }
  }

  dateInputHandler(date: string): void {
    this.course.date = date;
  }
  durationInputHandler(length: string) {
    this.course.length = length;
  }
  authorsInputHandler(authors: string) {
    return;
  }

  cancel(): void {
    this.store.dispatch(setStartZeroAndDirectToGetList());
  }
  save(): void {
    const modifiedCourse = {
      id:
        this.course.id || Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000,
      name: this.course.name,
      date: new Date().toISOString(),
      length: +this.course.length,
      description: this.course.description,
      authors: [],
      isTopRated: this.course.isTopRated,
    };
    !this.shouldEdit
      ? this.store.dispatch(createCourse(modifiedCourse))
      : this.store.dispatch(updateCourse(modifiedCourse));
  }
}
