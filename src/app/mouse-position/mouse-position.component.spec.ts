import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePositionComponent } from './mouse-position.component';

describe('MousePositionComponent', () => {
  let component: MousePositionComponent;
  let fixture: ComponentFixture<MousePositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MousePositionComponent]
    });
    fixture = TestBed.createComponent(MousePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
