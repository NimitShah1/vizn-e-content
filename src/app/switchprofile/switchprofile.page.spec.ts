import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchprofilePage } from './switchprofile.page';

describe('SwitchprofilePage', () => {
  let component: SwitchprofilePage;
  let fixture: ComponentFixture<SwitchprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
