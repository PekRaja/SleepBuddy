import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})

export class StatPage implements OnInit{

  ngOnInit(): void {
    this.ionViewDidLoad();
  }

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

    doughnutChart: any;
    lineChart: any;

    constructor(public navCtrl: NavController) {

    }

    ionViewDidLoad() {
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Deep sleep", "Normal sleep"],
                datasets: [{
                    label: 'Stages of sleep',
                    data: [6, 4],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ]
                }]
            }

        });

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: ["12pm", "1am", "2am", "3am", "4am", "5am", "6am","7am"],
                datasets: [
                    {
                        label: "Heartrate",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [48, 42, 45, 43, 41, 43, 40, 46],
                        spanGaps: false,
                    }
                ]
            }

        });

    }
    }
