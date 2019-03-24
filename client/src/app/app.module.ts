import {NgModule} from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RootStoreModule} from './root-store/root-store.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {AuthInterceptor} from './shared/auth-interceptor';
import {LoaderInterceptor} from './core/services/loader/loader-interceptor';
import {createTranslateLoader} from './intl/translate-loader';
import {TranslationHandler} from './intl/translation-handler';
import {
  TranslateService,
  KEYS as LANG_KEYS,
} from './core/services/translate/translate-service';
import {ModuleWithProviders} from '@angular/compiler/src/core';

const interceptor = (implementation: {new (): HttpInterceptor} | any) => ({
  provide: HTTP_INTERCEPTORS,
  useClass: implementation,
  multi: true,
});

export const importTranslateModule = (): ModuleWithProviders => {
  return TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
    missingTranslationHandler: {
      provide: MissingTranslationHandler,
      useClass: TranslationHandler,
    },
  });
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,

    importTranslateModule(),
    // dev
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
  providers: [interceptor(AuthInterceptor), interceptor(LoaderInterceptor)],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setDefaultLang(LANG_KEYS.ENGLISH);
  }
}
