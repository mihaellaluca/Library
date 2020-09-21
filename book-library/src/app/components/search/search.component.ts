import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchWord;
  @Output() searchCriteria = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  searchThis() {
    console.log("searched word emitted:", this.searchWord);
    this.searchCriteria.emit(this.searchWord);
  }
}
