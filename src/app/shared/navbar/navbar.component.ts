import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() showSidebarEvent = new EventEmitter<void>();
  @Input() showSidebar: boolean = false;

  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
