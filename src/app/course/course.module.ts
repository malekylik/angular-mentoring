import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

import { ToolboxComponent } from './toolbox/toolbox.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesListWithControlsComponent } from './courses-list-with-controls/courses-list-with-controls.component';
import { CourseRelevanceDirective } from './directives/course-relevance/course-relevance.directive';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { CourseOrderByPipe } from './pipes/course-order-by/course-order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { CoursesService } from './services/courses/courses.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    ToolboxComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesListWithControlsComponent,
    CourseRelevanceDirective,
    DurationPipe,
    CourseOrderByPipe,
    SearchPipe,
    DeleteConfirmationModalComponent,
  ],
  providers: [CoursesService],
  entryComponents: [
    DeleteConfirmationModalComponent
  ],
  exports: [
    CoursesListWithControlsComponent
  ]
})
export class CourseModule { }
