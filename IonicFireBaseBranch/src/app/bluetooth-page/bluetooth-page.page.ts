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
  devices:any[] = [];
  statusMessage: string;
  constructor(public navCtrl: NavController,public toastController: ToastController,private ble: BLE, private ngZone: NgZone, private themeService: ThemeService, private sleep_data: SleepDataServiceService) { }
  connect(){
    this.ble.connect('00:15:87:20:AE:DB').subscribe(async peripheralData => {
      const toast = await this.toastController.create({
        message: 'Connected',
        duration: 2000
      });
      toast.present();
       console.log(peripheralData);
    },
    peripheralData => {
      console.log('Disconnect');
    });
  }
  scan(){
    this.devices = [];
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
    );
  }
  onDeviceDiscovered(device){
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
      console.log(device);
    });
  }
}