import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {CitydetailPage} from "../citydetail/citydetail";
import {CityServiceProvider} from "../../providers/city-service/city-service";
import {PersonalPage} from '../personal/personal'

/**
 * Generated class for the CityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {
  cityData = {
    guess: [],
    hot: [],
    group: []
  };
  id: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private viewCtrl: ViewController,
              public fs: CityServiceProvider,) {
  }

  ionViewDidLoad() {
    this.id = localStorage.getItem('userid');
    console.log(this.id);
    this.fs.getcity('guess', (result) => {
      this.cityData.guess = JSON.parse(result._body);
      this.fs.getcity('hot', (result1) => {
        this.cityData.hot = JSON.parse(result1._body);
        this.fs.getcity('group', (result2) => {
          for (let i in JSON.parse(result2._body)) {
            let data = {
              i: i,
              sub: JSON.parse(result2._body)[i]
            };
            this.cityData.group.push(data)
          }
        })
      })
    })
  }

  gopersonel() {
    let modelPage = this.modalCtrl.create(PersonalPage);
    modelPage.present()
  }

  goo() {
    let modelPage = this.modalCtrl.create(CitydetailPage, {city: this.cityData.guess});
    modelPage.present()
  }

  gologin() {
    let modelPage = this.modalCtrl.create(LoginPage);
    modelPage.present()
  }



}
