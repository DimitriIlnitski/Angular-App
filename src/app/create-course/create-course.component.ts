import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  createCourse,
  returnToCourses,
  updateCourse,
} from '../store/app.actions';
import { selectItemById } from '../store/app.selector';
import { Observable, Subscription, of } from 'rxjs';
import { Course } from '../interfaces/course.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DBAuthor } from '../interfaces/db-author.interface';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  createForm!: FormGroup;
  authorsData: Observable<DBAuthor[]> = of([]);

  courseSubscription: Subscription | undefined;
  course: Course = {
    id: 0,
    name: '',
    date: '',
    length: 0,
    description: '',
    authors: [],
    isTopRated: false,
  };

  shouldEdit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.authorsData = this.authorsService.getAuthors();

    this.createForm = new FormGroup({
      createTitleGroup: new FormGroup({
        createTitle: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
      }),
      createDescriptionGroup: new FormGroup({
        createDescription: new FormControl('', [
          Validators.required,
          Validators.maxLength(500),
        ]),
      }),

      durationGroup: new FormGroup({
        duration: new FormControl('', [Validators.required]),
      }),
      dateGroup: new FormGroup({
        date: new FormControl('', [Validators.required]),
      }),
      authorsGroup: new FormGroup({
        authors: new FormControl([], [Validators.required]),
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
          this.course.length = course.length;
          this.course.description = course.description;
          this.course.authors.push(...course.authors);
          this.course.isTopRated = course.isTopRated;
          this.shouldEdit = true;
          this.createForm
            .get('createTitleGroup.createTitle')
            ?.setValue(course.name);
          this.createForm
            .get('createDescriptionGroup.createDescription')
            ?.setValue(course.description);
          this.createForm
            .get('durationGroup.duration')
            ?.setValue(String(course.length));
          this.createForm
            .get('dateGroup.date')
            ?.setValue(course.date.slice(0, 10));
          this.createForm.get('authorsGroup.authors')?.setValue(course.authors);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

  cancel(): void {
    this.store.dispatch(returnToCourses());
    this.router.navigate(['courses']);
  }

  save(): void {
    const modifiedCourse = {
      id:
        this.course.id || Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000,
      name: this.createForm.value.createTitleGroup.createTitle,
      date: this.createForm.value.dateGroup.date || new Date().toISOString(),
      length: +this.createForm.value.durationGroup.duration,
      description:
        this.createForm.value.createDescriptionGroup.createDescription,
      authors: this.createForm.value.authorsGroup.authors,
      isTopRated: this.course.isTopRated,
    };
    !this.shouldEdit
      ? this.store.dispatch(createCourse(modifiedCourse))
      : this.store.dispatch(updateCourse(modifiedCourse));
  }
}
