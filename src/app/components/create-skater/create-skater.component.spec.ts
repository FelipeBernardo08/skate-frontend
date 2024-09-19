import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkaterComponent } from './create-skater.component';

describe('CreateSkaterComponent', () => {
  let component: CreateSkaterComponent;
  let fixture: ComponentFixture<CreateSkaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSkaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
