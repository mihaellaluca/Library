import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"],
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      description: [""],
      sellPrice: [""],
      stock: ["", Validators.required],
    });
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      console.log("The form is invalid.");
      return;
    }
    this.productService
      .addNewProduct(
        this.f.title.value,
        this.f.author.value,
        this.f.description.value,
        this.f.stock.value,
        this.f.sellPrice.value
      )
      .pipe()
      .subscribe(
        (data) => {
          window.alert(`Book succesfully added!`);
          this.bookForm.reset();
        },
        (error) => {
          console.log(error);
          window.alert("Error. Please try again.");
        }
      );
  }
}
