import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelpivottabledataComponent } from './excelpivottabledata.component';

describe('ExcelpivottabledataComponent', () => {
  let component: ExcelpivottabledataComponent;
  let fixture: ComponentFixture<ExcelpivottabledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcelpivottabledataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelpivottabledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
