import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  isEditing = false;
  sortField: string;
  sortOrder: number;
  products1: Product[] = [];
  constructor(private productService: ProductService,private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
    this.sortField = 'name';
    this.sortOrder = 1; // Ascending order
  }

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.products1 = products;
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.isEditing) {
        const index = this.products.findIndex(p => p.id === product.id);
        // this.products[index] = product;
        this.productService.updateProduct(this.productForm.value);
        this.isEditing = false;
      } else {
        product.id = Date.now(); // Generate a unique ID
        // this.products.push(product);
        this.productService.addProduct(this.productForm.value);
      }
      this.productForm.reset();
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onEdit(product: Product) {
    this.isEditing = true;
    this.productForm.patchValue(product);
  }

  onDelete(id: number) {
    this.products = this.products
    .filter(product => product.id !== id);
    this.productService.deleteProduct(id);
  }
  applyFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if(inputValue){
      this.products = this.products.filter(product => 
        product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        product.price.toString().includes(inputValue) ||
        product.category.toLowerCase().includes(inputValue.toLowerCase())
      );
    }else{
      this.products = this.products1;
    }
  }
}
