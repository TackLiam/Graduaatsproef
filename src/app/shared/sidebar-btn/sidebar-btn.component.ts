import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-btn',
  templateUrl: './sidebar-btn.component.html',
  styleUrls: ['./sidebar-btn.component.css'],
})
export class SidebarBtnComponent {
  @Output() showSidebarEvent = new EventEmitter<void>();
  @Input() showSidebar: boolean = false;

  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
