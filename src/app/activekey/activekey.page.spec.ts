import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivekeyPage } from './activekey.page';

describe('ActivekeyPage', () => {
  let component: ActivekeyPage;
  let fixture: ComponentFixture<ActivekeyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivekeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
