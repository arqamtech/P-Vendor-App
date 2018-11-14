import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-add-sub-cat',
  templateUrl: 'add-sub-cat.html',
})
export class AddSubCatPage {
  
  subCatName : string;
  
  cat = this.navParams.get("cat");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public toastCtrl : ToastController,
  ) {
  }

  checkData(){
    if(this.subCatName){
      this.addSubCat();
    }else{ 
      this.presentToast("Enter Sub Category Name");
    }
  }

  addSubCat(){
    firebase.database().ref("Extra/SubCategories").push({
      Name : this.subCatName
    }).then((res)=>{
      firebase.database().ref("Extra/CategoriesIndex").child(this.cat).child(res.key).set(true);
    }).then(()=>{
      this.presentToast("Sub Category Added");
      this.navCtrl.pop();
    })
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    })
  }

}
