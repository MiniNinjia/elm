import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {UserServiceProvider}from'../../providers/user-service/user-service'
import {PersonalAddadresPage}from'../personal-addadres/personal-addadres'
/**
 * Generated class for the PersonalAdddetailaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-adddetailaddress',
  templateUrl: 'personal-adddetailaddress.html',
})
export class PersonalAdddetailaddressPage {
  cid: any;
  addres: any
  flag = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              private userSer: UserServiceProvider) {
  }

  ionViewDidLoad() {
    this.cid = localStorage.getItem('cityid') || null;
    this.flag = 0;
  }

  goto() {
    this.viewCtrl.dismiss();
  }

  searchads(ads) {
    if (ads) {
      this.userSer.getsearchaddress(this.cid, ads).then((data) => {
        this.addres = data;
      });
      this.flag = 1;
    }
    else {
      this.flag = 0
    }
  }

  goaddres(i) {
    this.viewCtrl.dismiss({adsname: this.addres[i]})
  }

}
