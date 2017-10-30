import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {PersonalAdddetailaddressPage} from '../personal-adddetailaddress/personal-adddetailaddress'
import {UserServiceProvider}from'../../providers/user-service/user-service'

/**
 * Generated class for the AddNewAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-address',
  templateUrl: 'add-new-address.html',
})
export class AddNewAddressPage {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userServe: UserServiceProvider,
              public modalCtrl: ModalController) {
  }

  cid: any;
  userid: any;
  callback: any;
  postData = {
    user_id: this.navParams.get('userid') || null,
    address: null,
    address_detail: null,
    geohash: null,
    name: null,
    phone: null,
    tag: null,
    sex: '0',
    poi_type: null,
    phone_bk: null,
    tag_type: null,
  };

  ionViewDidLoad() {
    this.userid = this.navParams.get('userid') || [];
    this.callback = this.navParams.get('callback');
    this.cid = localStorage.getItem('cityId');
  }

  disMiss(): void {
    this.callback().then(() => {
      this.navCtrl.pop()
    });
  }

  sel_address() {
    let modelPage = this.modalCtrl.create(PersonalAdddetailaddressPage, {cityid: this.cid});
    modelPage.onDidDismiss((data) => {
      this.postData.geohash = data.adsname.geohash;
      this.postData.address = data.adsname.address;
    });
    modelPage.present();
  }

  goto() {
    this.callback().then(() => {
      this.navCtrl.pop();
    })
  }

  add() {
    this.postData.tag_type = '2';
    this.postData.poi_type = '0';
    this.postData.user_id = localStorage.getItem('userid');

    this.userServe.addadres(this.postData.user_id, this.postData).then((data) => {
      if (data && data.status == 1) {
        this.goto();
      }
    });
  }

  selsex(i) {
    this.postData.sex = i;
  }
}
