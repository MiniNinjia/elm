import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PersonalAddadresPage}from'../personal-addadres/personal-addadres'
import {UserServiceProvider}from '../../providers/user-service/user-service'
import {from} from "rxjs/observable/from";

/**
 * Generated class for the PersonalChangeaddresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-changeaddres',
  templateUrl: 'personal-changeaddres.html',
  providers: [UserServiceProvider]
})
export class PersonalChangeaddresPage {
  udata: any;
  uid: any;
  uaddres: any;
  cityid: any;
  flag = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private userSer: UserServiceProvider) {
  }

  ionViewDidLoad() {
    this.udata = this.navParams.get('udata');
    this.userSer.getUseraddress(this.udata.user_id).then((data) => {
      this.uaddres = data;
    });
  }

  goto() {
    this.viewCtrl.dismiss()
  }

  goaddadrs() {
    this.uid = this.udata.id;
    console.log(this.uid);
    this.cityid = this.uaddres[0].city_id;
    this.navCtrl.push(PersonalAddadresPage, {cid: this.cityid, uadres: this.uaddres, callback: this.getdata})
  }

  over() {
    this.flag = !this.flag
  }

  deladre(i) {
    this.userSer.deladdres(this.udata.id, this.uaddres[i].id).then((data) => {
      this.uaddres.splice(i, 1);
      console.log(data);
    });
  }

  getdata = () => {
    return new Promise((resolve, reject) => {
      this.udata = this.navParams.get('udata');
      this.userSer.getUseraddress(this.udata.user_id).then((data) => {
        this.uaddres = data;
      });
      resolve();
    })
  }

}
