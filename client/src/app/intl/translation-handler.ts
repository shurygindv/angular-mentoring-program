import { MissingTranslationHandler } from '@ngx-translate/core';


export class TranslationHandler implements MissingTranslationHandler {
    public handle () {
        return '[Translation Handler] Not found';
    }
}
