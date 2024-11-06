import { ComponentFixture, TestBed, fakeAsync, tick, flush, waitForAsync } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProductById']);
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    mockActivatedRoute = {
      paramMap: of({ get: () => '1' })
    };

    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', waitForAsync(() => {
    mockProductService.getProductById.and.returnValue(
      of({
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        image: '',
        category: 'Category 1'
      })
    );

    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  }));

  it('should call addToCart on CartService when add to cart button is clicked', waitForAsync(() => {
    mockProductService.getProductById.and.returnValue(
      of({
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        image: '',
        category: 'Category 1'
      })
    );

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const addButton = fixture.debugElement.query(By.css('.add-to-cart'));
      addButton.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(mockCartService.addToCart).toHaveBeenCalledWith(jasmine.objectContaining({
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        image: '',
        category: 'Category 1'
      }));
    });
  }));

  it('should call location.back when the back button is clicked', fakeAsync(() => {
    mockProductService.getProductById.and.returnValue(
      of({
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        image: '',
        category: 'Category 1'
      })
    );
  
    fixture.detectChanges();
    tick();
  
    fixture.detectChanges();
    const backButton = fixture.debugElement.query(By.css('.back'));
  
    if (backButton) {
      backButton.triggerEventHandler('click', null);
      tick();
      expect(mockLocation.back).toHaveBeenCalled();
    } else {
      fail('.back button was not found in the DOM');
    }
  }));
  
});
