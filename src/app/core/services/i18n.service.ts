import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly key = 'lang';
  private langSubject = new BehaviorSubject<string>(this.initLang());
  lang$ = this.langSubject.asObservable();
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'pt-BR']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.langSubject.value);
  }
  private initLang(): 'en' | 'pt-BR' {
    const saved = localStorage.getItem(this.key);
    return saved === 'pt-BR' ? 'pt-BR' : 'en';
  }
  setLang(lang: 'en' | 'pt-BR') {
    localStorage.setItem(this.key, lang);
    this.langSubject.next(lang);
    this.translate.use(lang);
  }
}
