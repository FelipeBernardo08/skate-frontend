import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLocalsComponent } from './my-locals.component';

describe('MyLocalsComponent', () => {
  let component: MyLocalsComponent;
  let fixture: ComponentFixture<MyLocalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLocalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
