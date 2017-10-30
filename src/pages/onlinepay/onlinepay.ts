import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController, AlertController} from 'ionic-angular';
import {AddToCartProvider} from '../../providers/add-to-cart/add-to-cart';
import {TabsPage} from '../tabs/tabs'
/**
 * Generated class for the OnlinepayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onlinepay',
  templateUrl: 'onlinepay.html',
})
export class OnlinepayPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public atcp: AddToCartProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
  }

  time: any;
  result: any;
  m:number;
  s:number;


  ionViewDidLoad() {
    let data1 = this.navParams.get('data');
    this.m = 15;
    this.s = 0;
    this.atcp.order(data1).then((data) => {
      if (JSON.parse(data._body).status != 1) {
        this.presentToast('下单失败！请返回重新下单');
        setTimeout(() => {
          this.disMiss();
        }, 1000)
      } else {
        localStorage.removeItem('cart' + data1.restaurant_id);
        this.time = 15 * 60;
        setInterval(() => {
          this.time -= 1;
          this.m = +(this.time / 60).toFixed(0);
          this.s = +(this.time % 60).toFixed(0);
        }, 1000)
      }
    })
  }

  disMiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  }

  gopay() {
    this.showAlert();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '当前环境无法支付，请打开官方APP进行支付',
      buttons: [{
        text: '确认',
        handler: () => {
          this.navCtrl.remove(0, this.navCtrl.length());
          this.navCtrl.push(TabsPage, {tabsId: 2})
        }
      }]
    });
    alert.present();
  }
}
