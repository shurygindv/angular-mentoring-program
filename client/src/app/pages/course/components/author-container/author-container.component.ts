import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RootStoreState} from 'src/app/root-store';
import {
  AuthorStoreState,
  AuthorStoreSelectors,
} from 'src/app/root-store/author-store';
import {ActivatedRoute} from '@angular/router';
import {LabelItem} from 'src/app/shared/components/label-list/label-list.component';
import {Author} from 'src/app/core/models/author.interface';
import {
  FetchAuthorsAction,
  AddAuthorAction,
} from 'src/app/root-store/author-store/actions';
import {CourseStoreSelectors} from 'src/app/root-store/course-store';
import {Course} from 'src/app/core/models/course.interface';
import {Subscription} from 'rxjs';

const mapOnlyAuthorIds = (course: Course) =>
  (course.authors || []).map((item: Author) => item.id);

const mapAuthorToLabel = (author: Author) => ({
  id: author.id,
  name: `${author.firstName || ''} ${author.lastName || ''}`,
});

@Component({
  selector: 'app-author-container',
  templateUrl: './author-container.component.html',
  styleUrls: ['./author-container.component.scss'],
})
export class AuthorContainerComponent implements OnInit, OnDestroy {
  private addingAuthorSubscription: Subscription;

  public items: LabelItem[];

  private store$: Store<RootStoreState.State>;
  private route: ActivatedRoute;

  public authorLabels: LabelItem[];

  constructor(store$: Store<RootStoreState.State>, route: ActivatedRoute) {
    this.store$ = store$;
    this.route = route;
  }

  get needPresetsAuthors(): boolean {
    return !!this.courseId;
  }

  public get courseId(): string {
    return this.route.snapshot.paramMap.get('id');
  }



  public ngOnInit() {
    this.fetchAuthors();
    this.getCourseByRouteId();
    this.subscribeOnUpdateAuthorList();
  }

  public ngOnDestroy() {
    if (this.addingAuthorSubscription) {
      this.addingAuthorSubscription.unsubscribe();
    }
  }

  private subscribeOnUpdateAuthorList() {
    this.addingAuthorSubscription = this.store$
      .select(AuthorStoreSelectors.selectLastAddedAuthor)
      .subscribe((author: Author) => {
        if (author) {
          this.authorLabels = [...this.authorLabels, mapAuthorToLabel(author)];
        }
      });
  }

  private getCourseByRouteId() {
    if (this.needPresetsAuthors) {
      this.setAuthorsFromCourse();
    }
  }

  private setAuthorLabels(authors: Author[]): void {
    this.authorLabels = authors.map(
      (item: Author): LabelItem => ({
        id: item.id,
        name: item.firstName,
      }),
    );
  }

  private setAuthorsFromCourse() {
    this.store$
      .select(CourseStoreSelectors.selectCourseById(+this.courseId))
      .subscribe((course: Course) =>
        this.setAuthorLabels(mapOnlyAuthorIds(course)),
      )
      .unsubscribe();
  }

  private fetchAuthors() {
    this.store$.dispatch(new FetchAuthorsAction());
  }

  private fetchAddingCourse(value: string) {
    const [firstName, lastName] = value.split(' ');

    this.store$.dispatch(
      new AddAuthorAction({
        firstName: firstName || '',
        lastName: lastName || '',
      }),
    );
  }

  public onSubmit(value: string) {
    this.fetchAddingCourse(value);
  }

  public onRemove(item: LabelItem) {
    this.remove.emit(item.id);
  }
}
