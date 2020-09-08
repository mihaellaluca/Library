import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      console.log("Login form is invalid.");
      return;
    }
    console.log("on submit afisare:");
    let user = this.userService
      .register(
        this.f.firstName.value,
        this.f.lastName.value,
        this.f.email.value,
        this.f.password.value
      )
      .pipe()
      .subscribe(
        (data) => {
          console.log(data);
          window.alert("Account created succesfully!");
          this.router.navigate(["login"]);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
