import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(waitForAsync(() => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 100, description: 'Description 1', image: '', category: 'Category 1' },
      { id: 2, title: 'Product 2', price: 200, description: 'Description 2', image: '', category: 'Category 2' },
    ];
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        FormsModule,
        RouterModule.forRoot([]) 
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', (done) => {
    component.products$.subscribe((products) => {
      expect(products.length).toBe(2);
      done();
    });
  });

  it('should filter products by category', (done) => {
    component.selectedCategory$.next('Category 1');
    component.filteredProducts$.subscribe((filteredProducts) => {
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0].category).toBe('Category 1');
      done();
    });
  });

  it('should show all products when selected category is "All"', (done) => {
    component.selectedCategory$.next('All');
    component.filteredProducts$.subscribe((filteredProducts) => {
      expect(filteredProducts.length).toBe(2);
      done();
    });
  });

  it('should change category when selected', () => {
    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', { target: { value: 'Category 2' } });
    
    component.selectedCategory$.subscribe((selectedCategory) => {
      expect(selectedCategory).toBe('Category 2');
    });
  });
});
