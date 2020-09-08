import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "./../Models/UserModel";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUrl = "http://localhost:3000";
  constructor(private httpClient: HttpClient) {}

  // CREATE //
  register(firstName, lastName, email, password) {
    let body = {
      admin:false,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      currentBorrows:[]
    };
    return this.httpClient.post(`${this.apiUrl}/register`, body);
  }

  // UPDATE //
  updateCurrentBorrows(op, userId, borrowedBook) {
    let body = {
      operation: op,
      _id: userId,
      book: borrowedBook,
    };
    return this.httpClient.put(`${this.apiUrl}/currentBorrows`, body);
  }

  // READ //
  getCurrentBorrows(userId) {
    return this.httpClient.get(`${this.apiUrl}/getCurrentBorrows/${userId}`);
  }
}
