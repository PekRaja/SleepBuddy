import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ngOnInit(): void {
    this.ionViewDidLoad();
  }
  @ViewChild('barCanvas') barCanvas;
  
  ConnectButtonColor : string = "danger";
  ConnectButtonText : string = "connect";
  
  barChart: any;

  ConnectToDevice(){
      if(this.ConnectButtonColor == "danger"){
          this.ConnectButtonColor = "primary";
          this.ConnectButtonText = 'connect';
      }
      else if(this.ConnectButtonColor == "primary"){
        this.ConnectButtonColor = "danger";
        this.ConnectButtonText = 'disconnect';
      }
  }
  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
                        beginAtZero:true
                    }
                }]
            }
        }

    });

}
}

