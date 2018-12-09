import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent  {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  
  submitSearchValue () {
    console.log(this.searchForm.value);
  }

}
