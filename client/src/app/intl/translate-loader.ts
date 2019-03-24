import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

export const createTranslateLoader = (
  httpClient: HttpClient,
): TranslateHttpLoader =>
  new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
