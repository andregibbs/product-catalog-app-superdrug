import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = []; 
  selectedCategory: string = "All";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      this.categories = ["All", ...new Set(data.map(product => product.category))];     
      this.filterByCategory();
    });
  }

  filterByCategory(): void {
    this.filteredProducts = this.selectedCategory === "All"
      ? this.products
      : this.products.filter(product => product.category === this.selectedCategory);
  }
}
