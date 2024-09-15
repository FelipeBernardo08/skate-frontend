import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialgoCommentsComponent } from './dialgo-comments.component';

describe('DialgoCommentsComponent', () => {
  let component: DialgoCommentsComponent;
  let fixture: ComponentFixture<DialgoCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialgoCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialgoCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
