import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddSubCatPage } from '../add-sub-cat/add-sub-cat';


@IonicPage()
@Component({
  selector: 'page-view-sub-categories',
  templateUrl: 'view-sub-categories.html',
})
export class ViewSubCategoriesPage {

  cat = this.navParams.get("cat");
  SubCats : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }

  getSubCats(){
    firebase.database().ref("Extra/CategoriesIndex").child(this.cat).once("value",itemSnap=>{
      this.SubCats = [];
      itemSnap.forEach(snap=>{
        firebase.database().ref("SubCategories").child(snap.val()).once("value",iisnap=>{
          this.SubCats.push(iisnap.val());
        })
      })
    })
  }  

  gtAddSubCat(){
    this.navCtrl.push(AddSubCatPage,{cat : this.cat});
  }
}
