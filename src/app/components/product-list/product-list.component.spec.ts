import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 100, description: 'Description 1', image: '', category: 'Category 1' },
      { id: 2, title: 'Product 2', price: 200, description: 'Description 2', image: '', category: 'Category 2' },
    ];
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
    expect(component.categories.length).toBe(3);
    expect(component.categories).toEqual(['All', 'Category 1', 'Category 2']);
  });

  it('should filter products by category', () => {
    component.selectedCategory = 'Category 1';
    component.filterByCategory();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].category).toBe('Category 1');
  });

  it('should show all products when selected category is "All"', () => {
    component.selectedCategory = 'All';
    component.filterByCategory();
    expect(component.filteredProducts.length).toBe(2);
  });
});
