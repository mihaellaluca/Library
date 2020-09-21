import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { HttpClientModule } from "@angular/common/http";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CurrentBorrowsComponent } from "./components/current-borrows/current-borrows.component";
import { LoginComponent } from "./components/login/login.component";
import { BorrowedProductComponent } from "./components/borrowed-product/borrowed-product.component";
import { RegisterComponent } from "./components/register/register.component";
import { SearchComponent } from "./components/search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    AddBookComponent,
    CurrentBorrowsComponent,
    LoginComponent,
    BorrowedProductComponent,
    RegisterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
