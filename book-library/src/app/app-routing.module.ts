import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { CurrentBorrowsComponent } from "./components/current-borrows/current-borrows.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./helpers/auth.guard";
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add-book",
    component: AddBookComponent,
  },
  {
    path: "current-borrows",
    component: CurrentBorrowsComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
