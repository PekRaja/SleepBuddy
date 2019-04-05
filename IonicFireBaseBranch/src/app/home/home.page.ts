import { Component, ViewChild, NgZone, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ThemeService } from '../theme.service';
import { GraphicService } from '../graphic.service';
import { GraphicName, Graphic } from '../graphics';
import { SleepDataServiceService } from '../sleep-data-service.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  devices: any[] = [];
  statusMessage: string;
  ConnectButtonColor = 'danger';
  ConnectButtonText = 'connect';
  barChart: any;
  currentGraph: Graphic;
  username: string;
  constructor(
    private ble: BLE,
    private ngZone: NgZone,
    private themeService: ThemeService,
    private graphics: GraphicService,
    private user: UserService,
    private sleep_data: SleepDataServiceService,
    private navCtrl: NavController) { }
  ngOnInit(): void {
    this.ionViewDidLoad();
    // set username to show from sleep data service
    this.username = this.sleep_data.username;
  }
  ionViewDidEnter() {
    this.currentGraph = this.graphics.CurrentGraphic;
    console.log('graphic set');
  }
  graphName(g: number): string {
    return GraphicName[g];
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
    });
  }
  AdjustButtonStyle() {
    if (this.ConnectButtonColor === 'danger') {
      this.ConnectButtonColor = 'primary';
      this.ConnectButtonText = 'disconnect';
    } else if (this.ConnectButtonColor === 'primary') {
      this.ConnectButtonColor = 'danger';
      this.ConnectButtonText = 'connect';
    }
  }
  ConnectToDevice() {
    this.AdjustButtonStyle();
  }
  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: '# of hours slept',
          data: [6, 7, 6, 8, 6, 7],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
