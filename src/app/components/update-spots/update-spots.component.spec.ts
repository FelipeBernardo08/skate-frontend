import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpotsComponent } from './update-spots.component';

describe('UpdateSpotsComponent', () => {
  let component: UpdateSpotsComponent;
  let fixture: ComponentFixture<UpdateSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
