import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ThemeService } from '../theme.service';
import { SleepDataServiceService } from '../sleep-data-service.service';


@Component({
  selector: 'app-bluetooth-page',
  templateUrl: './bluetooth-page.page.html',
  styleUrls: ['./bluetooth-page.page.scss'],
})
export class BluetoothPagePage implements OnInit {
  ngOnInit(): void {
    console.log(this.sleep_data.user);
  }
  devices: any[] = [];
  statusMessage: string;
  data: any;
  constructor(public navCtrl: NavController, public toastController: ToastController, private ble: BLE, private ngZone: NgZone, private themeService: ThemeService, private sleep_data: SleepDataServiceService) { }
  connect() {
    const BLE_MAC_ADDR = '00:15:87:20:AE:DB';
    const SERVICE_UUID = 'ffe0';
    const CHARACTERISTIC_UUID = 'ffe1';
    this.ble.connect(BLE_MAC_ADDR).subscribe(
      res => {
        console.log('Response from subscribe on connect');
        console.log(res);
        console.log(JSON.stringify(res));
        this.ble.startNotification(BLE_MAC_ADDR, get64BitUUID(SERVICE_UUID), get64BitUUID(CHARACTERISTIC_UUID)).subscribe((data) => {
          console.log('DATA ARRIVED');
          console.log(data);
          console.log(JSON.stringify(data));
          var d = new Uint8Array(data);
          this.data += bytesToString(d);
          console.log(this.data);
        }, (error) => {
          console.log('error on startnotification');
          console.log(error);
        })
        this.ble.read(BLE_MAC_ADDR, get64BitUUID(SERVICE_UUID), get64BitUUID(CHARACTERISTIC_UUID)).then((val) => {
          this.data += bytesToString(val);
          console.log('value arrived on ble read.');
          console.log('raw');
          console.log(val);
          console.log('json.stringify');
          console.log(JSON.stringify(val));
          console.log('bytesToString');
          console.log(bytesToString(val));
        }).catch((error) => {
          console.log('failed to receive data...');
          console.log(error);
        });
      },
      error => { console.log('error on connect'); console.log(error); },
      () => { console.log('connect completed'); });
  }
  scan() {
    this.devices = [];
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
    );
  }
  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
      console.log(device);
    });
  }
}

// ASCII only
export function stringToBytes(string) {
  var array = new Uint8Array(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    array[i] = string.charCodeAt(i);
  }
  return array.buffer;
}

// ASCII only
export function bytesToString(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

export function get64BitUUID(uuid: string) {
  return `0000${uuid}-0000-1000-8000-00805f9b34fb`;
}
