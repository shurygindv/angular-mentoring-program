import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {HeaderComponent} from './components/header/header.component';
import {BodyComponent} from './components/body/body.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {IconComponent} from './components/icon/icon.component';
import {ButtonComponent} from './components/button/button.component';
import {TextComponent} from './components/text/text.component';
import {MenuProfileComponent} from './components/menu-profile/menu-profile.component';
import {BreadCrumbsComponent} from './components/bread-crumbs/bread-crumbs.component';
import {ContentBoxComponent} from './components/content-box/content-box.component';

import {DateStatusDirective} from './date-status.directive';

@NgModule({
  declarations: [
    // directives
    DateStatusDirective,
    // components
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SearchBarComponent,
    IconComponent,
    ButtonComponent,
    TextComponent,
    MenuProfileComponent,
    BreadCrumbsComponent,
    ContentBoxComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SearchBarComponent,
    TextComponent,
    BreadCrumbsComponent,
    IconComponent,
    ButtonComponent,
    ContentBoxComponent,

    DateStatusDirective,
  ],
})
export class SharedModule {}
