import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCreateComponent } from './offers-create.component';

describe('OffersCreateComponent', () => {
  let component: OffersCreateComponent;
  let fixture: ComponentFixture<OffersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
