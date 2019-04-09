import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ThemeService } from '../theme.service';
import { SleepDataServiceService, BLE_MAC_ADDR, SERVICE_UUID, CHARACTERISTIC_UUID } from '../sleep-data-service.service';


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
  data = "";
  isConnected = false;
  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private themeService: ThemeService,
    private sleep_data: SleepDataServiceService) { }
  connect() {
    this.ble.connect(BLE_MAC_ADDR).subscribe(
      res => {
        console.log('Connect to SLEEPBUDDY.');
        this.isConnected = true;
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
        });
      },
      error => { console.log('error on connect'); console.log(error); },
      () => { console.log('connect completed'); });
  }
  bleDisconnect() {
    this.ble.disconnect(BLE_MAC_ADDR).then(() => {
      console.log('Disconnected from sleepbuddy.');
      this.isConnected = false;
    }).catch((error) => console.log(error));
  }
  scan() {
    this.devices = [];
    this.ble.scan([], 5).subscribe(device => this.onDeviceDiscovered(device));
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
