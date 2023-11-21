import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from '../../basket/basket.types';
import { Product } from '../../catalog/product/product.types';
import { Customer } from '../../customer/customer.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly basePath = 'http://localhost:8080';

  private httpClient = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.basePath}/api/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.basePath}/api/products/${id}`);
  }

  getBasket(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(`${this.basePath}/api/basket`);
  }

  addToBasket(productId: string): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(`${this.basePath}/api/basket`, { productId });
  }

  checkoutBasket(customer: Customer) {
    return this.httpClient.post<{ orderNumber: number }>(`${this.basePath}/api/basket/checkout`, customer);
  }

  __kaboom__() {
    return this.httpClient.get<{ reset: true }>(`${this.basePath}/reset`);
  }
}
