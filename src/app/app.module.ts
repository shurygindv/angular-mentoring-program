import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { HomeModule } from './modules/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { CoreModule } from './core';
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
