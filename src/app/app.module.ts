// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { provideHttpClient } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, 
    RouterModule.forRoot([
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailComponent }
    ])
  ],
  providers: [
    ProductService,
    CartService,
    provideHttpClient() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
