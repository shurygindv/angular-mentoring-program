import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialUiModule} from '../../shared/material-ui.module';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MaterialUiModule, SharedModule, LoginRoutingModule],
})
export class LoginModule {}
