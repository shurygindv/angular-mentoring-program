import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './pages/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
