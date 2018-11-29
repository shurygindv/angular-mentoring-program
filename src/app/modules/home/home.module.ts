import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './pages/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,

    HomeRoutingModule
  ],
  providers: [],
})
export class HomeModule { }
