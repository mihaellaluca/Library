import { Component, OnInit, Output } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  logged = false;
  admin = false;
  userName;

  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  logout() {
    this.authenticationService.logout();
  }
  subscribeToCurrentUser() {
    this.authenticationService.currentUserSubject.subscribe(
      (data) => {
        console.log("subscribe la currentUserSub", data);
        if (data) {
          this.logged = true;
          this.admin = data.admin;
          this.userName = data.firstName + " " + data.lastName;
        } else {
          this.logged = false;
        }
      },
      (err) => {
        console.log("err la subscribe la currentUserSub", err);
      }
    );
  }
}
