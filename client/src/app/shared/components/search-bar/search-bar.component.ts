import {
  ChangeDetectionStrategy,
  EventEmitter,
  OnDestroy,
  Component,
  Output,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OnInit} from '@angular/core';
import {takeUntil, debounceTime, skipWhile} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  public searchForm = new FormGroup({
    search: new FormControl(),
  });

  @Output() public inputChanges: EventEmitter<string> = new EventEmitter();

  public ngOnInit() {
    this.searchForm.controls.search.valueChanges
      .pipe(
        skipWhile((value: string) => value.length <= 3),
        debounceTime(300),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(this.submitSearchValue);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submitSearchValue = (value: string) => {
    this.inputChanges.emit(value);
  }
}
