import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "protractor";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchWord = "";
  // @Output() searchcriteria = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // searchThis() {
  //   this.searchcriteria.emit(this.searchWord);
  // }
}
