import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,ModalController} from 'ionic-angular';
import {PersonalAdddetailaddressPage}from'../personal-adddetailaddress/personal-adddetailaddress'
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserServiceProvider}from'../../providers/user-service/user-service'
import {from} from "rxjs/observable/from";
/**
 * Generated class for the PersonalAddadresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-addadres',
  templateUrl: 'personal-addadres.html',
})
export class PersonalAddadresPage {
  cid:any;
  adsname:any = {};
  user_id:any;
  uaddres:any;
  addres = {
    name: null,
    user_id: null,
    address: null,
    address_detail: null,
    phone: null,
    phone_bk: null,
    geohash: null,
    tag: null,
    sex: null,
    poi_type: null,
    tag_type: null
  };
  callback:any;
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
              public viewCtrl:ViewController,
              private formBuilder:FormBuilder,
              public userServe:UserServiceProvider) {
  }

  ionViewDidLoad() {
    this.adsname = this.navParams.get('adsname');
    this.cid = this.navParams.get('cid');
    this.uaddres = this.navParams.get('uadres');
    this.user_id = localStorage.getItem('userid');
    this.callback=this.navParams.get('callback');
  }

  goto() {
    this.callback().then(()=>{
      this.navCtrl.pop();
    })
  }

  godetail() {
    let modelPage = this.modalCtrl.create(PersonalAdddetailaddressPage, {cityid: this.cid});
    modelPage.onDidDismiss((data) => {
      this.addres.geohash = data.adsname.geohash;
      this.addres.address = data.adsname.address;
    });
    modelPage.present();
  }

  address() {
    this.addres.tag = '家';
    this.addres.sex = '1';
    this.addres.poi_type = '0';
    this.addres.tag_type = '2';
    this.addres.user_id = localStorage .getItem('userid');
    this.userServe.addadres(this.user_id).then((data) => {
      this.uaddres.push(this.addres)
    });
    console.log(this.uaddres);
  }

}
