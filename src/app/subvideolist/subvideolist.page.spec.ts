import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubvideolistPage } from './subvideolist.page';

describe('SubvideolistPage', () => {
  let component: SubvideolistPage;
  let fixture: ComponentFixture<SubvideolistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubvideolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
