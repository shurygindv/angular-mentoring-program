import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {BodyComponent} from './components/body/body.component';
import {BreadCrumbsComponent} from './components/bread-crumbs/bread-crumbs.component';
import {ButtonComponent} from './components/button/button.component';
import {ContentBoxComponent} from './components/content-box/content-box.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {IconComponent} from './components/icon/icon.component';
import {MenuProfileComponent} from './components/menu-profile/menu-profile.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {TextComponent} from './components/text/text.component';
import {DateStatusDirective} from './date-status.directive';
import {LoaderOverlayComponent} from './components/loader-overlay/loader-overlay.component';
import {DurationNormalizerPipe} from './duration-normalizer.pipe';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    // directives
    DateStatusDirective,
    DurationNormalizerPipe,
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
    LoaderOverlayComponent,
    // pages
    PageNotFoundComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
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
    LoaderOverlayComponent,

    DateStatusDirective,
    DurationNormalizerPipe,
    ReactiveFormsModule,
    FormsModule,

    // pages
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
