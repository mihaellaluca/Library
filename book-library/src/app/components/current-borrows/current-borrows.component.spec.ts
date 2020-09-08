import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBorrowsComponent } from './current-borrows.component';

describe('CurrentBorrowsComponent', () => {
  let component: CurrentBorrowsComponent;
  let fixture: ComponentFixture<CurrentBorrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBorrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
