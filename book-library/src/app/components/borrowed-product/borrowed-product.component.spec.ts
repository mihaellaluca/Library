import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedProductComponent } from './borrowed-product.component';

describe('BorrowedProductComponent', () => {
  let component: BorrowedProductComponent;
  let fixture: ComponentFixture<BorrowedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
