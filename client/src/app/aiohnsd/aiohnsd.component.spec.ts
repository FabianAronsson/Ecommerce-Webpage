import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiohnsdComponent } from './aiohnsd.component';

describe('AiohnsdComponent', () => {
  let component: AiohnsdComponent;
  let fixture: ComponentFixture<AiohnsdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiohnsdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiohnsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
