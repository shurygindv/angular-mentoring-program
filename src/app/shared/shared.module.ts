import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { LayoutComponent } from './components/layout/layout.component';
import { TitleComponent } from './components/title/title.component';
import { TextComponent } from './components/text/text.component';
import { IconComponent } from './components/icon/icon.component';

// TODO: make component module

@NgModule({
  imports: [CommonModule],
  declarations: [
    LayoutComponent,
    TitleComponent,
    TextComponent,
    IconComponent,
  ],
  exports: [
    LayoutComponent,
    TitleComponent,
    TextComponent,
    IconComponent,
  ]
})
export class SharedModule {}
