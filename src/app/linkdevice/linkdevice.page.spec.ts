import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkdevicePage } from './linkdevice.page';

describe('LinkdevicePage', () => {
  let component: LinkdevicePage;
  let fixture: ComponentFixture<LinkdevicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkdevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
