import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelsubjectPage } from './selsubject.page';

describe('SelsubjectPage', () => {
  let component: SelsubjectPage;
  let fixture: ComponentFixture<SelsubjectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelsubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
