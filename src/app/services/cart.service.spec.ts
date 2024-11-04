import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should add products to cart', () => {
    const product: Product = { id: 1, title: 'Product 1', price: 100, description: 'Description 1', image: '', category: 'Category 1' };

    service.addToCart(product);
    expect(service.getCartItems().length).toBe(1);
    expect(service.getCartItems()).toContain(product);
  });

  it('should clear the cart', () => {
    const product: Product = { id: 1, title: 'Product 1', price: 100, description: 'Description 1', image: '', category: 'Category 1' };
    service.addToCart(product);
    service.clearCart();
    expect(service.getCartItems().length).toBe(0);
  });
});
