import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  createCourse,
  returnToCourses,
  updateCourse,
} from '../store/app.actions';
import { selectItemById } from '../store/app.selector';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../interfaces/course.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  editAndCreateForm!: FormGroup;

  courseSubscription: Subscription | undefined;
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editAndCreateForm = new FormGroup({
      createTitle: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      'ec-description': new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      duration: new FormGroup({
        value: new FormControl(0, Validators.required),
      }),
      date: new FormGroup({
        value: new FormControl(0, Validators.required),
      }),
      authors: new FormGroup({
        value: new FormControl(0, Validators.required),
      }),
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      const courseFromStore: Observable<Course | undefined> = this.store.select(
        selectItemById(+id)
      );
      this.courseSubscription = courseFromStore.subscribe((course) => {
        if (course) {
          this.course.id = course.id;
          this.course.name = course.name;
          this.course.date = course.date;
          this.course.length = String(course.length);
          this.course.description = course.description;
          this.course.authors = [];
          this.course.isTopRated = course.isTopRated;
          this.shouldEdit = true;
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
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
    this.store.dispatch(returnToCourses());
    this.router.navigate(['courses']);
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
