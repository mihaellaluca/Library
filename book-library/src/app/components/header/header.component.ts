import { Component, OnInit, Output } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { EventEmitter } from "protractor";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  logged = false;
  currentUser = this.authenticationService.currentUserValue;
  admin = false;
  userName;

  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    if (this.currentUser) {
      this.logged = true;
      this.admin = this.currentUser.admin;
      this.userName =
        this.currentUser.firstName + " " + this.currentUser.lastName;
    }
  }

  logout() {
    window.location.reload();
    this.authenticationService.logout();
  }
}
