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
   providers:[UserServiceProvider]
})
export class LoginPage {
  loginForm: FormGroup;
  username: any;
  password: any;
  code: any;
  codeImg: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private userServe: UserServiceProvider) {
    this.loginForm = formBuilder.group({
      telephone: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      code: ['', Validators.compose([Validators.required])]
    });
    this.username = this.loginForm.controls['telephone'];
    this.password = this.loginForm.controls['password'];
    this.code = this.loginForm.controls['code'];
  }

  ionViewDidLoad() {
    console.log()
    this.getcode();

  }

  disMiss() {
    this.viewCtrl.dismiss();
  }

  login(data) {
    this.userServe.login(data).then((data)=>{
      console.log(data);
      localStorage.setItem('userid',7378);
    });
    console.log(this.loginForm);
    this.viewCtrl.dismiss()
    this.navCtrl.push()
  }
  getcode() {

    this.userServe.getcode().then((data) => {

      this.codeImg = data.code;
      console.log(data.code)
    })
  }


}
