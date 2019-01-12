import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';





@IonicPage()
@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html',
})
export class ProfileDetailsPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db : AngularFireDatabase,    
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    ) {
    this.getVendor();
  }

    
    StoreName: string;
    OwnerName: string;
    PhoneNumber: string;
    StoreCategory: string;
    StoreLocation: string;
    email: string;
    pass: string;
    created: string;
    status : string;
  
  
  
  
  
  
    getVendor(){
      let loading = this.loadingCtrl.create({
        content: 'Logging In...'
      });
      loading.present();
  
      this.db.object(`Seller Data/Sellers/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap=>{
        var temp : any = snap.payload.val();
        this.StoreName = temp.StoreName;
        this.OwnerName = temp.OwnerName;
        this.PhoneNumber = temp.PhoneNumber;
        this.StoreCategory = temp.StoreCategory;
        this.StoreLocation = temp.StoreLocation;
        this.email = temp.Email;
        this.pass = temp.Pass;
        this.created = temp.TimeStamp;
        this.status = temp.Status;
      })
      loading.dismiss();
    }
  

}
