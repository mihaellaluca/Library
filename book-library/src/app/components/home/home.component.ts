import { Component, OnInit, Output } from "@angular/core";
import { ProductModel } from "src/app/Models/ProductModel";
import { ProductService } from "src/app/services/product.service";
import { EventEmitter } from "protractor";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];
  productsSearch: ProductModel[] = [];
  searchWord: string = "";
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  searchThis() {
    console.log("product searched:", this.productsSearch);
    this.productsSearch = this.productsSearch.filter((product) => {
      console.log("product[i]:", product);
      product.title 
        .toLowerCase()
        .includes(this.searchWord.toLowerCase().trim());
    });
    console.log("searchWord:", this.searchWord);
    console.log("searched products:", this.productsSearch);
  }

  getAllProducts() {
    var allProducts = this.productService
      .getAllProducts()
      .pipe()
      .subscribe(
        (data) => {
          this.products = data["data"];
          console.log("data from server", this.products);
          this.productsSearch = this.products;
        },
        (error) => {
          console.error("Error at fetching products", error);
        }
      );
  }
}
