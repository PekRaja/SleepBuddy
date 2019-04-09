import { Component, OnInit, NgZone } from '@angular/core';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { from } from 'rxjs';


@Component({
  selector: 'app-bluetooth-backup',
  templateUrl: './bluetooth-backup.component.html',
  styleUrls: ['./bluetooth-backup.component.scss']
})
export class BluetoothBackupComponent implements OnInit {

  constructor(private bluetoothSerial: BluetoothSerial, private ngZone: NgZone) { }

  ngOnInit() {
  }

  scan(){
  this.bluetoothSerial.list().then((data) => {
    JSON.stringify( data );
    console.log("hurray" + data);
    //this.showDevices("Found Devices", data.id, data.class, data.address, data.name);
  },
  (error) => {
  console.log("could not find paired devices because: " + error);
  //this.showError(error);
  });
  }
  /* 
  onDeviceDiscovered(device: any){
    console.log('Discovered ' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device);
      console.log(device)
      //this.error.push(error);
    })
  }*/
}
