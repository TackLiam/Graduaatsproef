import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private currentLanguage: string = 'nl';
  private translationsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );

  constructor(private http: HttpClient) {
    this.loadTranslations();
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === 'nl' ? 'fr' : 'nl';
    this.loadTranslations();
  }

  getTranslations(): Observable<any> {
    return this.translationsSubject.asObservable();
  }

  private loadTranslations() {
    this.http
      .get(`../../assets/i18n/${this.currentLanguage}.json`)
      .subscribe((translations) => {
        this.translationsSubject.next(translations);
      });
  }
}
