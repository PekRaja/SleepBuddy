import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bluetoothSerial'
})
export class BluetoothSerialPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
