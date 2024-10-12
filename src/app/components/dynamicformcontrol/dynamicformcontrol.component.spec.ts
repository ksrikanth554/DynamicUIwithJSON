import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformcontrolComponent } from './dynamicformcontrol.component';

describe('DynamicformcontrolComponent', () => {
  let component: DynamicformcontrolComponent;
  let fixture: ComponentFixture<DynamicformcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicformcontrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicformcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
