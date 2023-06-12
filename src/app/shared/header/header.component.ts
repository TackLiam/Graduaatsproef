import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/core/services/i18n.service';

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
  shoppingCart: string = '';
  inputPlaceholder: string = '';

  zoekbalkValue = '';
  totalQuantity: number = 0;
  @Input() isNavBarVisible: boolean = false;
  @Input() showSidebar: boolean = false;
  @Output() showSidebarEvent = new EventEmitter<void>();

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.i18nService.getTranslations().subscribe((transitions) => {
      this.shoppingCart = transitions['header.shoppingcart'];
      this.inputPlaceholder = transitions['header.inputPlaceholder'];
    });
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

  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
