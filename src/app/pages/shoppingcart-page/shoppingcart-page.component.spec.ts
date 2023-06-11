import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartPageComponent } from './shoppingcart-page.component';

describe('ShoppingcartPageComponent', () => {
  let component: ShoppingcartPageComponent;
  let fixture: ComponentFixture<ShoppingcartPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingcartPageComponent]
    });
    fixture = TestBed.createComponent(ShoppingcartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
