import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  apiUrl = "http://localhost:3000";
  constructor(private httpClient: HttpClient) {}

  // CREATE //
  addNewProduct(title, author, description, stock, sellPrice) {
    let body = {
      title: title,
      author: author,
      description: description,
      stock: stock,
      sellPrice: sellPrice,
    };
    return this.httpClient.post(`${this.apiUrl}/addBook`, body);
  }

  // READ //
  getAllProducts() {
    return this.httpClient.get(`${this.apiUrl}/books`);
  }

  // UPDATE //
  // when a book is borrowed, the current stock of 'available for borrowing' is decremented
  // when it's returned, it is incremented back
  updateStock(bookId, op) {
    let body = { id: bookId, operation: op };
    console.log("body:", body);
    return this.httpClient.put(`${this.apiUrl}/updateBook`, body);
  }

  // DELETE //
  deleteProduct(bookId) {
    return this.httpClient.delete(`${this.apiUrl}/deleteBook/${bookId}`);
  }
}
