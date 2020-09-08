import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
} from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { UserService } from "src/app/services/user.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { EventEmitter } from "protractor";
import { ProductModel } from "src/app/Models/ProductModel";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product;
  admin: Boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log("product:", this.product);
    this.admin = this.authenticationService.currentUserValue.admin;
  }

  borrow() {
    if (this.product.stock > 0) {
      // decrement number of currently available for borrowing
      this.updateStockAfterBorrow();
      // add product to CurrentBorrows in users profile
      this.updateCurrentBorrows();
      window.alert(`You added ${this.product.title} to Current Borrows`);
    } else if (this.product.stock === 0) {
      window.alert(
        "This book is not available for borrowing right now. Please check the stock later!"
      );
    }
  }

  updateStockAfterBorrow() {
    this.productService
      .updateStock(this.product._id, "dec")
      .pipe()
      .subscribe(
        (data) => {},
        (error) => {
          window.alert("Error. Please try again later.");
          console.log(error.body);
        }
      );
  }
  updateCurrentBorrows() {
    let userId = this.authenticationService.currentUserValue._id;
    let book = {
      _id: this.product._id,
      title: this.product.title,
      author: this.product.author,
    };
    this.userService
      .updateCurrentBorrows("add", userId, book)
      .pipe()
      .subscribe(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
  }

  deleteBook() {
    this.productService
      .deleteProduct(this.product._id)
      .pipe()
      .subscribe(
        (data) => {
          console.log(data);
          window.alert("Book deleted!");
          window.location.reload();
        },
        (error) => {
          console.log(error);
          window.alert("Error. Could not delete.");
        }
      );
  }
}
