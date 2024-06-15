import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Banana', price: 100, category: 'Fruits' },
    { id: 2, name: 'Apple', price: 200, category: 'Fruits' },
    { id: 3, name: 'Cherri', price: 250, category: 'Fruits' },
  ]);

  products$ = this.products.asObservable();

  addProduct(product: Product) {
    const currentProducts = this.products.value;
    this.products.next([...currentProducts, { ...product, id: Date.now() }]);
  }

  updateProduct(product: Product) {
    const currentProducts = this.products.value;
    const index = currentProducts.findIndex(p => p.id === product.id);
    currentProducts[index] = product;
    this.products.next([...currentProducts]);
  }

  deleteProduct(id: number) {
    const currentProducts = this.products.value.filter(p => p.id !== id);
    this.products.next(currentProducts);
  }
}
