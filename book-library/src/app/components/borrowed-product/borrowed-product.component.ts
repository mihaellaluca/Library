import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-borrowed-product",
  templateUrl: "./borrowed-product.component.html",
  styleUrls: ["./borrowed-product.component.scss"],
})
export class BorrowedProductComponent implements OnInit {
  @Input() productBorrowed;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log("productBorrowed:", this.productBorrowed);
  }

  returnBook() {
    this.updateStockAfterReturn();
    this.removeFromCurrentBorrows();
  }

  updateStockAfterReturn() {
    this.productService
      .updateStock(this.productBorrowed._id, "inc")
      .pipe()
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          window.alert("Error. Please try again later.");
          console.log(error.body);
        }
      );
  }
  removeFromCurrentBorrows() {
    let userId = this.authenticationService.currentUserValue._id;
    this.userService
      .updateCurrentBorrows("remove", userId, this.productBorrowed)
      .pipe()
      .subscribe(
        (data) => {
          console.log("removed", data);
          window.alert("Book removed");
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
