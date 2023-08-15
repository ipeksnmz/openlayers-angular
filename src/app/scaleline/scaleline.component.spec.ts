import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalelineComponent } from './scaleline.component';

describe('ScalelineComponent', () => {
  let component: ScalelineComponent;
  let fixture: ComponentFixture<ScalelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalelineComponent]
    });
    fixture = TestBed.createComponent(ScalelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
