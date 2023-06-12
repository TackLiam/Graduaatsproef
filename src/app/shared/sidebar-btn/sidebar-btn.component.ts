import { Component, EventEmitter, Input, Output } from '@angular/core';
import { I18nService } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-sidebar-btn',
  templateUrl: './sidebar-btn.component.html',
  styleUrls: ['./sidebar-btn.component.css'],
})
export class SidebarBtnComponent {
  productBtn: string = '';

  @Output() showSidebarEvent = new EventEmitter<void>();
  @Input() showSidebar: boolean = false;

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.i18nService.getTranslations().subscribe((translations) => {
      this.productBtn = translations['productBtn'];
    });
  }

  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
