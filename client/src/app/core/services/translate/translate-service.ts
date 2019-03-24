import {Injectable} from '@angular/core';
import {TranslateService as NgTranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

const RUSSIA = 'russian';
const ENGLISH = 'english';

export const KEYS = {
  RUSSIA,
  ENGLISH,
};

const mapToAppLangKeys = (key: string): string => {
  return {
    ru: RUSSIA,
    en: ENGLISH,
  }[key];
};

@Injectable()
export class TranslateService {
  private translateService: NgTranslateService;

  constructor(translateService: NgTranslateService) {
    this.translateService = translateService;
  }

  get currentLang(): string {
    return mapToAppLangKeys(this.translateService.currentLang);
  }

  public setDefaultLang(lang: string): void {
    switch (lang) {
      case RUSSIA: {
        this.translateService.setDefaultLang('ru');
        break;
      }
      case ENGLISH: {
        this.translateService.setDefaultLang('en');
        break;
      }
      default: {
        throw new Error('Should be passed known lang');
      }
    }
  }

  public use(lang: string): Observable<any> {
    return this.translateService.use(lang);
  }

  public getIntlKeys(): string[] {
    return [ENGLISH, RUSSIA];
  }
}
