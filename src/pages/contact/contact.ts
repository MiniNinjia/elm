import {Component} from '@angular/core';
import {NavController, ModalController, ViewController} from 'ionic-angular';
import {ShopPage} from '../shop/shop';
import {HomePage} from "../home/home";
import {OrderdetailPage} from "../orderdetail/orderdetail";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController) {

  }
  disMiss() {
    this.navCtrl.push(HomePage)
    this.viewCtrl.dismiss();
  }

  jump() {
    let modelPage = this.modalCtrl.create(OrderdetailPage);
    modelPage.present()
  }

}
