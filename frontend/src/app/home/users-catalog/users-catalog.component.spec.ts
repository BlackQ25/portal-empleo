import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCatalogComponent } from './users-catalog.component';

describe('UsersCatalogComponent', () => {
  let component: UsersCatalogComponent;
  let fixture: ComponentFixture<UsersCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
