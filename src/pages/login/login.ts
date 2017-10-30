import {Component} from '@angular/core';
import {ViewController, Content, App} from 'ionic-angular';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ToastController} from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import {UserServiceProvider} from '../../providers/user-service/user-service'

//
// import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserServiceProvider]
})
export class LoginPage {
  loginForm: FormGroup;
  username: any;
  password: any;
  captcha_code: any;
  codeImg: any;
  callback: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private userServe: UserServiceProvider) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      captcha_code: ['', Validators.compose([Validators.required])]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.captcha_code = this.loginForm.controls['captcha_code'];
  }

  ionViewDidLoad() {
    this.callback = this.navParams.get('callback');
    this.getcode();
  }

  disMiss() {
    if (this.callback) {
      this.callback().then(() => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }
  };

  login(data) {
    this.userServe.login(data).then(data1 => {

      if (data1.id) {

        localStorage.setItem('userid', data1.id)
        this.disMiss();

      } else {
        this.presentToast(data1.message);
        this.getcode();
      }
    });
  }

  getcode() {
    this.userServe.getcode().then((data) => {
      this.codeImg = data.code;
    })
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
