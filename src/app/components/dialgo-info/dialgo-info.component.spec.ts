import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialgoInfoComponent } from './dialgo-info.component';

describe('DialgoInfoComponent', () => {
  let component: DialgoInfoComponent;
  let fixture: ComponentFixture<DialgoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialgoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialgoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
