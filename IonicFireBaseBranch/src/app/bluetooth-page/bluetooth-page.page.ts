import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-bluetooth-page',
  templateUrl: './bluetooth-page.page.html',
  styleUrls: ['./bluetooth-page.page.scss'],
})
export class BluetoothPagePage implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  devices:any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController,private toastCtrl: ToastController,private ble: BLE, private ngZone: NgZone){

  }
  connect(){
    this.ble.connect('00:15:87:20:AE:DB').subscribe(peripheralData => {
       console.log(peripheralData);
    },
    peripheralData => {
      console.log("Disconnect");
    });

  }

  scan(){
    //this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];

    this.ble.scan([],5).subscribe(
      device => this.onDeviceDiscovered(device),
      //error => this.(error)
    );
    //setTimeout(this.setStatus.bind(this),5000,'Scan complete');
  }

  onDeviceDiscovered(device){
    console.log('Discovered ' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device);
      console.log(device)
      //this.error.push(error);
      
    })
    
  }
}