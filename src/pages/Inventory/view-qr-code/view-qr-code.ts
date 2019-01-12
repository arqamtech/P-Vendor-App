import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, AlertController, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-view-qr-code',
  templateUrl: 'view-qr-code.html',
})
export class ViewQrCodePage {

  prod = this.navParams.get("prod");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
  ) {
  }








  addInventory() {
    let alert = this.alertCtrl.create({
      title: this.prod.Name,
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type: 'number',
          min: '0',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.quantity) {
              this.UpdateQuantity(this.prod, data.quantity);
            } else {
              this.presentToast("Enter Quantity");
            }
          }
        }
      ]
    });
    alert.present();
  }

  UpdateQuantity(p, q) {
    if (q > 0) {

      firebase.database().ref("Products").child(p.key).child("Quantity").transaction(quans => {
        // console.log(quans.val());
        let to = Number(quans);
        let quan = Number(q);
        if (quans) {
          this.presentToast("Quantity Updated")
          return +to + quan;
        } else {
          this.presentToast("Quantity Updated")
          return quan;
        }
      })
    } else {
      this.presentToast("Quantity Not Valid");
    }
  }





  delPConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Remove Product ?',
      message: 'This Product cannot be recovered again.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.delP();
          }
        }
      ]
    });
    alert.present();
  }
  delP() {

    let loading = this.loadingCtrl.create({
      content: 'Removing Product...'
    });

    firebase.storage().ref("Products").child(firebase.auth().currentUser.uid).child(this.prod.Name).delete().then(() => {
      firebase.database().ref("Products").child(this.prod.key).remove().then(() => {
        firebase.database().ref("CategorieswiseProducts").child(this.prod.CategoryKey).child(this.prod.key).remove().then(() => {
          firebase.database().ref("Seller Data/Products").child(firebase.auth().currentUser.uid).child(this.prod.key).remove().then(() => {
            loading.dismiss();
            this.presentToast("Product Deleted");
          })
        })
      })
    })
  }










    presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }


}
