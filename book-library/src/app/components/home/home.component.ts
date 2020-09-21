import { Component, OnInit, Output } from "@angular/core";
import { ProductModel } from "src/app/Models/ProductModel";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];
  productsSearched: ProductModel[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    var allProducts = this.productService
      .getAllProducts()
      .pipe()
      .subscribe(
        (data) => {
          this.products = data["data"];
          this.productsSearched = this.products;
        },
        (error) => {
          console.error("Error at fetching products", error);
        }
      );
  }

  searchThis(data) {
    let productsFiltered = [];
    this.products.forEach((prod) => {
      if (
        prod.title.toLowerCase() === data.toLowerCase().trim() ||
        prod.author.toLowerCase() === data.toLowerCase().trim()
      ) {
        productsFiltered.push(prod);
      }
    });
    if (productsFiltered.length) {
      this.productsSearched = productsFiltered;
    } else if (data.length <= 0) {
      this.productsSearched = this.products;
    }
  }
}
