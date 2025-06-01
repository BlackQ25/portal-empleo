import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCatalogComponent } from './offers-catalog.component';

describe('OffersCatalogComponent', () => {
  let component: OffersCatalogComponent;
  let fixture: ComponentFixture<OffersCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
