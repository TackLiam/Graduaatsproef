import { Component, HostListener, Renderer2 } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', transformOrigin: 'left' }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateX(0)', transformOrigin: 'left' })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)', transformOrigin: 'left' }),
        animate(
          '500ms ease-in',
          style({ transform: 'translateX(-100%)', transformOrigin: 'left' })
        ),
      ]),
    ]),
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'carrefour';
  showSidebar = false;
  isNavBarVisible = false;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbarHeight = this.getNavbarHeight();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isNavBarVisible = scrollTop > navbarHeight;
  }

  private getNavbarHeight(): number {
    return 50;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;

    if (this.showSidebar) {
      this.renderer.addClass(document.body, 'hideScrollbar');
    } else {
      this.renderer.removeClass(document.body, 'hideScrollbar');
    }
  }
}
