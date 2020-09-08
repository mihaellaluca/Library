import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserModel } from "../Models/UserModel";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  apiUrl = "http://localhost:3000";

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  checkUser(email, password) {
    let user = {
      email: email,
      password: password,
    };
    return this.httpClient.post(`${this.apiUrl}/login`, user);
  }

  login(email, password) {
    this.checkUser(email, password)
      .pipe()
      .subscribe(
        (data) => {
          console.log("user=", data["data"]);
          if (data["statusCode"] === 200) {
            localStorage.setItem("currentUser", JSON.stringify(data["data"]));
            this.currentUserSubject.next(data["data"]);
            this.router.navigate([""]);
            window.location.reload();

            return data["data"];
          }
        },
        (error) => {
          console.log(error.body);
          window.alert("Error occured on login");
          return;
        }
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["login"]);
  }
}
