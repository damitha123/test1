import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMainMenuOpenCloseComponent } from './left-main-menu-open-close.component';

describe('LeftMainMenuOpenCloseComponent', () => {
  let component: LeftMainMenuOpenCloseComponent;
  let fixture: ComponentFixture<LeftMainMenuOpenCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftMainMenuOpenCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMainMenuOpenCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
