import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationItemComponent } from './medication-item.component';

describe('MedicationItemComponent', () => {
  let component: MedicationItemComponent;
  let fixture: ComponentFixture<MedicationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
