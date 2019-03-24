import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthorStoreSelectors} from '../../../../root-store/author-store';
import {Author} from '../../../../core/models/author.interface';
import {FetchAuthorsAction} from '../../../../root-store/author-store/actions';
import {StoreService} from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-course-author-control',
  templateUrl: './author-control.component.html',
  styleUrls: ['./author-control.component.scss'],
})
export class AuthorControlComponent implements OnInit, OnDestroy, OnChanges {
  private storeService: StoreService;
  private authorsSubscription: Subscription;
  private authorList: Author[];

  public authorLabels: Author[];

  @Input() public selectedAuthorIds: string[];
  @Output() public selectionChange = new EventEmitter<string[]>();

  constructor(storeService: StoreService) {
    this.storeService = storeService;
  }

  private assignAuthors = (authors: Author[]): void => {
    this.authorList = authors;

    this.setAuthorLabels(authors);
  }

  private setAuthorLabels(authors: Author[]) {
    this.authorLabels = (authors || []).filter((author: Author) =>
      (this.selectedAuthorIds || []).includes(author.id),
    );
  }

  private fetchAuthors(): void {
    this.storeService.dispatch(new FetchAuthorsAction());
  }

  private listenFetchedAuthors(): void {
    this.authorsSubscription = this.storeService
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
