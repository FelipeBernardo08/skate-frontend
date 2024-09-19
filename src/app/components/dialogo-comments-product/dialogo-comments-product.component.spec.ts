import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCommentsProductComponent } from './dialogo-comments-product.component';

describe('DialogoCommentsProductComponent', () => {
  let component: DialogoCommentsProductComponent;
  let fixture: ComponentFixture<DialogoCommentsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoCommentsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCommentsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
