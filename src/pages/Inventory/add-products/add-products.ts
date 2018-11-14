import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddCatPage } from '../add-cat/add-cat';

@IonicPage()
@Component({
  selector: 'page-add-products',
  templateUrl: 'add-products.html',
})
export class AddProductsPage {

  // cats  :Array<any> = [];
  // subCats :Array<any> = [];

  name : string;
  cat : string;
  subCat : string;

  // catSel : string;
  // subCatSel  :string;


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public toastCtrl : ToastController,
  ) {
  }
  // ionViewDidEnter(){
  //   this.getCats();
  // }
  // getCats(){
  //   firebase.database().ref("Extra/Categories").once("value",itemSnap=>{
  //     this.cats = [];
  //     itemSnap.forEach(snap=>{
  //       let temp : any = snap.val();
  //       temp.key = snap.key;
  //       this.cats.push(temp);
  //     })
  //   })
  // }
  // getsubCats(){
  //   firebase.database().ref("Extra/CategoriesIndex").child(this.catSel).once("value",itemSnap=>{
  //     this.subCats = [];
  //     itemSnap.forEach(snap=>{
  //       firebase.database().ref("SubCategories").child(snap.key).once("value",iisnap=>{
  //         var temp : any = iisnap.val();
  //         temp.key = iisnap.key;
  //         this.subCats.push(temp);
  //       })
  //     })
  //   })
  // }

  addProduct(){
    firebase.database().ref("Products").push({
      Name : this.name,
      Category : this.cat,
      SubCategory : this.subCat,
    }).then(()=>{
      this.presentToast("Product Added");
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
  checkData(){
    if(this.name){
      if(this.cat){
        if(this.subCat){
          this.addProduct();
        }else{this.presentToast("Enter SubCategory Name")}
      }else{this.presentToast("Enter Category Name")}
    }else{this.presentToast("Enter Product Name")}
  }
  // gtAddCat(){
  //   this.navCtrl.push(AddCatPage);
  // }
}
