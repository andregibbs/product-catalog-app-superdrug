import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, Subject, switchMap, take, takeUntil, timer } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  productAdded$ = new BehaviorSubject<boolean>(false); 
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductById(id);
      }),
      takeUntil(this.destroy$)
    );
  }

  addToCart(): void {
    this.product$.pipe(
      take(1),
      switchMap(product => {
        this.cartService.addToCart(product);
        this.productAdded$.next(true);
        return timer(2500);
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => this.productAdded$.next(false));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
