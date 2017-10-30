import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {TabsPage}from'../../pages/tabs/tabs'
import {from} from "rxjs/observable/from";
import {PersonalMessagePage}from'../../pages/personal-message/personal-message'
import {HomePage}from'../../pages/home/home'
import {ContactPage}from'../../pages/contact/contact'
import {PersonalServePage}from'../../pages/personal-serve/personal-serve'
import {PersonalChangeaddresPage}from'../personal-changeaddres/personal-changeaddres'


import {UserServiceProvider}from'../../providers/user-service/user-service'
/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
  providers: [UserServiceProvider]
})
export class PersonalPage {
  userData: any;
  _lenght: any;
  uid: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public modalCtrl: ModalController,
              private userSer: UserServiceProvider) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('userid');
    this._lenght = this.navCtrl.length();
    console.log(this._lenght)
    this.userSer.getUsermessage(this.uid).then((data) => {
      this.userData = data;
    })
  };

  goto() {
    this.viewCtrl.dismiss();
  }

  goOrder() {
    this.navCtrl.push(ContactPage);
    this.viewCtrl.dismiss();
  }

  goServe() {
    let modelPage = this.modalCtrl.create(PersonalServePage);
    modelPage.onDidDismiss(() => {
    });

    modelPage.present();
  }

  goUserMes(umane) {
    let modelPage = this.modalCtrl.create(PersonalMessagePage, {udata: this.userData});
    modelPage.onDidDismiss(() => {
      console.log('hfjkh');
    });

    modelPage.present();
  }

}
