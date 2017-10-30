import {Component} from '@angular/core';
import {NavController, ModalController, ViewController, AlertController} from 'ionic-angular';
import {ShopPage} from '../shop/shop';
import {HomePage} from "../home/home";
import {OrderdetailPage} from "../orderdetail/orderdetail";
import {UserServiceProvider} from '../../providers/user-service/user-service'
import {LoginPage} from '../login/login'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public usp: UserServiceProvider) {

  }

  data: any;

  ionViewDidLoad() {
    console.log('1111');

    let userid = localStorage.getItem('userid');
    if (userid) {
      this.usp.getOrderList(userid, 0).then((data) => {
        this.data = data;
        setInterval(() => {
          this.data.forEach((item, index) => {
            if (item.status_bar.title == '等待支付') {
              let time = (item.order_time + 15 * 60 * 1000) - new Date().getTime();
              this.data[index].Seconds=(time/1000%60).toFixed(0);
              this.data[index].Minutes=(time/1000/60).toFixed(0);
              if(time<=0){
                this.data[index].status_bar.title = '支付超时';
              }
            }
          });
        }, 1000)
      })
    } else {
      this.showAlert();
    }
  }

  disMiss() {
    this.viewCtrl.dismiss();
  }

  jump() {
    let modelPage = this.modalCtrl.create(OrderdetailPage);
    modelPage.present()
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '未登录，请先登录',
      buttons: [{
        text: '确认',
        handler: () => {
          this.navCtrl.push(LoginPage)
        }
      }]
    });
    alert.present();
  }
}
