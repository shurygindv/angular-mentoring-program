import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { HomeModule } from './modules/home/home.module';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './shared/components/title/title.component';
import { TextComponent } from './shared/components/text/text.component';
import { IconComponent } from './shared/components/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,

    TitleComponent,
    TextComponent,
    IconComponent
  ],
  imports: [
    HomeModule,
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
