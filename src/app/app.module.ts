import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { HomeModule } from '@app/modules/home/home.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,

    HomeModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
