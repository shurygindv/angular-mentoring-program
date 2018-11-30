import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home.routing';
// components
import { HomeComponent } from './pages/home.component';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  providers: []
})
export class HomeModule {}
