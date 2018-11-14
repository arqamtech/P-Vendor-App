import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ViewSubCategoriesPage } from '../view-sub-categories/view-sub-categories';


@IonicPage()
@Component({
  selector: 'page-add-cat',
  templateUrl: 'add-cat.html',
})
export class AddCatPage {

  catName : string;
  
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public toastCtrl : ToastController,
  ) {
  }

  getSubCats(){
    
  }


  checkData(){
    if(this.catName){
      this.addCat();
    }else{
      this.presentToast("Enter Category Name")
    }
  }

  addCat(){
    firebase.database().ref("Extra/Categories").push({
      Name : this.catName,
    }).then((res)=>{
      this.presentToast("Category Added");
      this.navCtrl.push(ViewSubCategoriesPage,{cat : res.key});
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
