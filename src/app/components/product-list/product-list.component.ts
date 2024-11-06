import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categories: string[] = ["All"];
  selectedCategory$ = new BehaviorSubject<string>('All'); 
  products$;
  filteredProducts$;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    this.products$ = this.productService.getProducts().pipe(
      tap(products => {
        this.categories = ["All", ...new Set(products.map(product => product.category))];
        this.cdr.detectChanges(); 
      })
    );

    this.filteredProducts$ = combineLatest([this.products$, this.selectedCategory$]).pipe(
      map(([products, selectedCategory]) => 
        selectedCategory === 'All' 
          ? products 
          : products.filter(product => product.category === selectedCategory)
      )
    );
  }

  ngOnInit(): void {}

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement; 
    const selectedCategory = target.value; 
    this.selectedCategory$.next(selectedCategory);
  }
}
