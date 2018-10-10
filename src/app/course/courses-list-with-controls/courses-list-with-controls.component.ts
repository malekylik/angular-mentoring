import { Component, OnInit } from '@angular/core';

import { Course } from '../course.model';
import { CourseOrderByPipe } from '../course-order-by.pipe';
import { SearchPipe } from '../search.pipe';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list-with-controls',
  templateUrl: './courses-list-with-controls.component.html',
  styleUrls: ['./courses-list-with-controls.component.css'],
  providers: [
    CourseOrderByPipe,
    SearchPipe,
  ]
})
export class CoursesListWithControlsComponent implements OnInit {

  courses: Course[];
  transformedCourses: Course[];

  constructor(
    private courseOrderByPipe : CourseOrderByPipe,
    private searchPipe : SearchPipe,
    private coursesService: CoursesService
  ) { 
    this.courses = [];
    this.transformedCourses = [];
  }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
    this.transformedCourses = this.orderByCourses(this.courses);
  }

  onSearch(searchString: string): void {
    if (typeof searchString === 'string') {
      if (searchString !== '') {
        this.transformedCourses = this.searchCourses(this.orderByCourses(this.courses), searchString);
      } else {
        this.transformedCourses = this.orderByCourses(this.courses);
      }
    }
  }

  onLoadMore(): void {
    console.log("LOADING");
  }

  private orderByCourses(courses: Course[]): Course[] {
    return this.courseOrderByPipe.transform(courses);
  }

  private searchCourses(courses: Course[], searchString: string): Course[] {
    return this.searchPipe.transform(courses, searchString);
  }
}
