import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CityPage} from "../city/city";
import {UserServiceProvider} from '../../providers/user-service/user-service'
/**
 * Generated class for the CitydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-citydetail',
  templateUrl: 'citydetail.html',
})
export class CitydetailPage {
  city: any;
  searchText: any;
  result: any;
  callback: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public usp: UserServiceProvider) {
  }

  ionViewDidLoad() {
    this.city = this.navParams.get('city');
    console.log(this.city);
    this.callback = this.navParams.get('callback');
  }

  disMiss(data) {
    this.callback(data).then(() => {
      this.navCtrl.pop()
    });
  }

  search() {
    if (this.searchText) {
      this.usp.getsearchaddress(this.city.id, this.searchText).then((data) => {
        console.log(data)
        this.result = data;
      })
    }
  }

  selAddress(data){
    localStorage.setItem('address',JSON.stringify(data));
    this.disMiss(data)
  }
}
