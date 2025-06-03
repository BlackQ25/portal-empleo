import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersEditComponent } from './offers-edit.component';

describe('OffersEditComponent', () => {
  let component: OffersEditComponent;
  let fixture: ComponentFixture<OffersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
