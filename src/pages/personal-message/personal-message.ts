import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController, ToastController} from 'ionic-angular';
import {PersonalChangeaddresPage}from'../personal-changeaddres/personal-changeaddres'
import {PersonalPasswordPage}from'../personal-password/personal-password'
import {PersonalNamePage}from'../personal-name/personal-name'
import {UserServiceProvider}from'../../providers/user-service/user-service'
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs'
/**
 * Generated class for the PersonalMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-message',
  templateUrl: 'personal-message.html',
})
export class PersonalMessagePage {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              private userSer: UserServiceProvider) {
  }

  uploadimg = null;
  udata: string;

  ionViewDidLoad() {
    this.udata = this.navParams.get('udata');
  }

  ionViewDidEnter() {
  }

  goto() {
    this.viewCtrl.dismiss();
  }

  goChangeName() {
    this.navCtrl.push(PersonalNamePage)
  }

  goChangeAdress() {
    this.navCtrl.push(PersonalChangeaddresPage, {udata: this.udata});
  }

  goChangePas() {
    this.navCtrl.push(PersonalPasswordPage);
  }

  goout() {
    this.userSer.singout().then(() => {
      this.presentToast('成功退出登陆');
      localStorage.clear();
      this.navCtrl.popAll();
      this.navCtrl.push(TabsPage);
    });
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  }

}
