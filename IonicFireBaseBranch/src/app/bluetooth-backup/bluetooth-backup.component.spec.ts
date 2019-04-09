import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothBackupComponent } from './bluetooth-backup.component';

describe('BluetoothBackupComponent', () => {
  let component: BluetoothBackupComponent;
  let fixture: ComponentFixture<BluetoothBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
