import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController, SelectValueAccessor } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { promise } from 'protractor';


@Component({
  selector: 'app-bluetooth-page',
  templateUrl: './bluetooth-page.page.html',
  styleUrls: ['./bluetooth-page.page.scss'],
})
export class BluetoothPagePage implements OnInit {
  power: boolean;
  ngOnInit(): void {
    console.log("Test worked");
    
  }
 

  devices:any[] = [];
  logData = ' ';
  readMessage = '';
  statusMessage: string;
  a:any[] = []

  constructor(public navCtrl: NavController,public toastController: ToastController,private ble: BLE, private ngZone: NgZone){

  }
  connect(){
    this.ble.connect('00:15:87:20:AE:DB').subscribe(async peripheralData => {
      const toast = await this.toastController.create({
        message: 'Connected',
        duration: 2000
      });
      toast.present();
       console.log(peripheralData);
       while(true) { 
        await this.BluetoothReadTest();
       }
    },
    peripheralData => {
      console.log("Disconnect");
    });
   
  }
  BluetoothRead(){
  this.ble.read('00:15:87:20:AE:DB', 'ffe0','ffe1')
    
    let promise = new Promise (function(data){
    console.log("Hooray we have data"+JSON.stringify(data, null,2));
    //alert("Successfully read data from device."+JSON.stringify(data));
    //this.data = [];
    let stringResult = String.fromCharCode.apply(null, new Uint8Array(this.data));
    console.log(stringResult); 
    });
   
  }
  async BluetoothReadTest(){
    let buffer = await this.ble.read('00:15:87:20:AE:DB', 'ffe0','ffe1')//.then(
      // console.log('Discovered ' + JSON.stringify(buffer,null,2))
      let a = String.fromCharCode.apply(null, new Uint8Array(buffer));
    
      console.log(a[0])
      
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

  onDeviceDiscovered(device: any){
    console.log('Discovered ' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device);
      console.log(device)
      //this.error.push(error);
    })
    
  }
  
}