import { Component, OnInit, Input } from "@angular/core";
import { ProductModel } from "src/app/Models/ProductModel";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { UserService } from "src/app/services/user.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-current-borrows",
  templateUrl: "./current-borrows.component.html",
  styleUrls: ["./current-borrows.component.scss"],
})
export class CurrentBorrowsComponent implements OnInit {
  products = [];
  hasBorrow = false;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    let userId = this.authenticationService.currentUserValue._id;
    this.getCurrentBorrows(userId);
  }

  getCurrentBorrows(userId) {
    this.userService
      .getCurrentBorrows(userId)
      .pipe()
      .subscribe(
        (data) => {
          this.products = data["data"].currentBorrows;
          console.log("products borrowed:", this.products);
          if (this.products.length > 0) this.hasBorrow = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
