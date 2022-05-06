import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortPageComponent } from './short-page.component';

describe('ShortPageComponent', () => {
  let component: ShortPageComponent;
  let fixture: ComponentFixture<ShortPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
