import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './pages/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, BodyComponent, FooterComponent],
  imports: [
    SharedModule,

    HomeRoutingModule
  ],
  providers: [],
})
export class HomeModule { }
