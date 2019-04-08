import { BluetoothSerialPipe } from './bluetooth-serial.pipe';

describe('BluetoothSerialPipe', () => {
  it('create an instance', () => {
    const pipe = new BluetoothSerialPipe();
    expect(pipe).toBeTruthy();
  });
});
