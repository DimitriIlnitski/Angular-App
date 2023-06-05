import { Component } from '@angular/core';
import { Course } from './interfaces/course.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mockedArray: Array<Course> = [
  {
    "id": 8693,
    "name": "duis mollit reprehenderit ad",
    "description": "Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.",
    "isTopRated": false,
    "date": "2017-09-28T04:39:24+00:00",
    "authors": [
      {
        "id": 1370,
        "name": "Polly",
        "lastName": "Sosa"
      }
    ],
    "length": 157
  },
  {
    "id": 4980,
    "name": "magna excepteur aute deserunt",
    "description": "Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.",
    "isTopRated": false,
    "date": "2016-05-31T02:02:36+00:00",
    "authors": [
      {
        "id": 8413,
        "name": "Greta",
        "lastName": "Richardson"
      },
      {
        "id": 7458,
        "name": "Deana",
        "lastName": "Bruce"
      },
      {
        "id": 5508,
        "name": "Patsy",
        "lastName": "Bright"
      }
    ],
    "length": 207
  },
  ]
}
