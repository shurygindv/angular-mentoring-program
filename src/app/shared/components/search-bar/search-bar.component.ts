import {Component, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  public searchForm = new FormGroup({
    search: new FormControl(),
  });

  @Output() public inputChanges = new EventEmitter();

  private get form(): FormGroup {
    return this.searchForm;
  }

  private get searchValue(): string {
    return this.form.value.search;
  }

  public submitSearchValue() {
    this.inputChanges.emit(this.searchValue);
  }
}
