import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothPagePage } from './bluetooth-page.page';

describe('BluetoothPagePage', () => {
  let component: BluetoothPagePage;
  let fixture: ComponentFixture<BluetoothPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
