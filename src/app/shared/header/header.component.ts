import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('scaleInAnimation', [
      transition(':enter', [
        style({ transform: 'scaleX(0)', transformOrigin: 'left', width: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'scaleX(1)', transformOrigin: 'left', width: '*' })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'scaleX(1)', transformOrigin: 'left', width: '*' }),
        animate(
          '300ms ease-in',
          style({ transform: 'scaleX(0)', transformOrigin: 'left', width: 0 })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  zoekbalkValue = '';
  totalQuantity: number = 0;
  @Input() isNavBarVisible: boolean = false;
  @Input() showSidebar: boolean = false;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.getTotalQuantity().subscribe((total) => {
      this.totalQuantity = total;
    });
  }

  clearInput() {
    this.zoekbalkValue = '';
  }
  SearchInput() {
    if (this.zoekbalkValue !== '') {
      this.router.navigate(['search', this.zoekbalkValue]);
    }
  }

  @Output() showSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
