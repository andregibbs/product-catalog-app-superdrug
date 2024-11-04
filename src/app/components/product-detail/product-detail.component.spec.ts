import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { Location } from '@angular/common';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProductById']);
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    
    const mockProduct: Product = { id: 1, title: 'Product 1', price: 100, description: 'Description 1', image: '', category: 'Category 1' };
    mockProductService.getProductById.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  return key === 'id' ? '1' : null; 
                }
              }
            }
          }
        },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details', () => {
    expect(component.product).toEqual(jasmine.objectContaining({
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Description 1',
      image: '',
      category: 'Category 1'
    }));
  });
});
