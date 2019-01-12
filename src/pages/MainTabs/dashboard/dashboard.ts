import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

import { NotVerifiedpagePage } from '../../Supps/not-verifiedpage/not-verifiedpage';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  labelsArray : Array<any> = [];
  dataArray : Array<any> = [];


  // Nums
  pendOrdersTot: number = 0;

  prods: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public popoverCtrl: PopoverController,
  ) {
    this.getUser();
    this.getProducts();
  }


  // LoadCharts() {
  //   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
  //     type: 'doughnut',
  //     data: {
  //       labels: this.labelsArray,
  //       datasets: [{
  //         data: this.dataArray,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.8)',
  //           'rgba(54, 162, 235, 0.8)',
  //           'rgba(255, 206, 86, 0.8)',
  //           'rgba(75, 192, 192, 0.8)',
  //           'rgba(153, 102, 255, 0.8)',
  //           'rgba(255, 159, 64, 0.8)'
  //         ],
  //         hoverBackgroundColor: [
  //           "#FF6384",
  //           "#36A2EB",
  //           "#FFCE56",
  //           "#FF6384",
  //           "#36A2EB",
  //           "#FFCE56"
  //         ]
  //       }]
  //     }

  //   });
  // }

  ionViewDidEnter(){
    this.getUser();
  }
  getUser(){
    firebase.database().ref("Seller Data").child("Sellers").child(firebase.auth().currentUser.uid).once("value", itemSnap => {
      if (itemSnap.val().Status == "Unverified") {
        this.navCtrl.push(NotVerifiedpagePage);
      }
    })
  }

  getProducts() {
    this.db.list(`Seller Data/Products/${firebase.auth().currentUser.uid}`, ref => ref.orderByChild('Sales')).snapshotChanges().subscribe(snap => {
      this.prods = [];
      snap.forEach(snip => {
        firebase.database().ref("Products").child(snip.key).once("value", iiSnap => {
          var temp: any = iiSnap.val();
          temp.key = iiSnap.key;
          this.labelsArray.push(temp.Name);
          this.dataArray.push(temp.Sales);
          this.prods.push(temp);
        }).then(()=>{
          // this.LoadCharts();
        })
      })
    })
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



}
