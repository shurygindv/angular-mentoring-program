import {Component, Input} from '@angular/core';


interface LabelItem {
    id: string;
    name: string;
}


@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
})
export class LabelListComponent {
 @Input() public items: LabelItem[];


 constructor () {
    
 }
}
