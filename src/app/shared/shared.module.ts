import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { LayoutComponent } from './components/layout/layout.component';
import { TitleComponent } from './components/title/title.component';
import { TextComponent } from './components/text/text.component';
import { IconComponent } from './components/icon/icon.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { SearchComponent } from './components/search/search.component';
import { FormComponent } from './components/form/form.component';
import { ButtonComponent } from './components/button/button.component';

// TODO: make component module

@NgModule({
  imports: [CommonModule],
  declarations: [
    LayoutComponent,
    TitleComponent,
    TextComponent,
    IconComponent,
    BreadCrumbsComponent,
    SearchComponent,
    FormComponent,
    ButtonComponent,
  ],
  exports: [
    LayoutComponent,
    TitleComponent,
    TextComponent,
    IconComponent,
  ]
})
export class SharedModule {}
