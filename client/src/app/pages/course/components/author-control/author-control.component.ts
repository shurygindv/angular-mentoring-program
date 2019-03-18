import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {RootStoreState} from './../../../../root-store';
import {AuthorStoreSelectors} from 'src/app/root-store/author-store';
import {Author} from 'src/app/core/models/author.interface';
import {FetchAuthorsAction} from 'src/app/root-store/author-store/actions';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-course-author-control',
  templateUrl: './author-control.component.html',
  styleUrls: ['./author-control.component.scss'],
})
export class AuthorControlComponent implements OnInit, OnDestroy, OnChanges {
  private store$: Store<RootStoreState.State>;
  private authorsSubscription: Subscription;
  private authorList: Author[];

  public authorLabels: Author[];

  @Input() public selectedAuthorIds: string[];
  @Output() public selectionChange = new EventEmitter<string[]>();

  constructor(store$: Store<RootStoreState.State>) {
    this.store$ = store$;
  }

  private assignAuthors = (authors: Author[]): void => {
    this.authorList = authors;
    console.log(authors);
    this.setAuthorLabels(authors);
  }

  private setAuthorLabels(authors: Author[]) {
    this.authorLabels = (authors || []).filter((author: Author) =>
      (this.selectedAuthorIds || []).includes(author.id),
    );
  }

  private fetchAuthors(): void {
    this.store$.dispatch(new FetchAuthorsAction());
  }

  private listenFetchedAuthors(): void {
    this.authorsSubscription = this.store$
      .select(AuthorStoreSelectors.selectAllAuthors)
      .subscribe(this.assignAuthors);
  }

  public ngOnInit(): void {
    this.fetchAuthors();
    this.listenFetchedAuthors();
  }

  public ngOnDestroy(): void {
    this.authorsSubscription.unsubscribe();
  }

  public ngOnChanges() {
    this.setAuthorLabels(this.authorList);
  }

  public updateCheckedAuthors(changes: {value: string[]}) {
    this.selectedAuthorIds = changes.value;
    this.selectionChange.emit(this.selectedAuthorIds);
  }

  public uncheck(removable: Author) {
    this.selectionChange.emit(
      this.selectedAuthorIds.filter((id: string) => id !== removable.id),
    );
  }
}
