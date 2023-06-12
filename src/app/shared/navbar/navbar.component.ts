import { Component, EventEmitter, Input, Output } from '@angular/core';
import { I18nService } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  languageBtn: string = '';

  @Output() showSidebarEvent = new EventEmitter<void>();
  @Input() showSidebar: boolean = false;

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.i18nService.getTranslations().subscribe((translations) => {
      this.languageBtn = translations['navbar.languageBtn'];
    });
  }

  switchLanguage() {
    this.i18nService.switchLanguage();
  }

  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
