import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {PersonalPage}from '../../pages/personal/personal'
import {FileUploader} from 'ng2-file-upload';
import {PersonalChangeaddresPage}from'../personal-changeaddres/personal-changeaddres'
import {PersonalPasswordPage}from'../personal-password/personal-password'
import {PersonalNamePage}from'../personal-name/personal-name'
import {UserServiceProvider}from'../../providers/user-service/user-service'
import {from} from "rxjs/observable/from";
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
              private viewCtrl:ViewController,
              public modalCtrl:ModalController,
              private userSer: UserServiceProvider) {
  }
  uploadimg = null;
  udata:string;
  //uploader: FileUploader = new FileUploader({
  //  url: this.imgurl + '/upload',
  //  method: 'POST',
  //  avatar: 'Uimg'
  //});

  ionViewDidLoad() {
    this.udata=this.navParams.get('udata');
    //console.log(this.udata);
  }
  ionViewDidEnter(){
  }
  goto(){
    this.viewCtrl.dismiss();
  }
  goChangeName(){
 this.navCtrl.push(PersonalNamePage)
  }
  goChangeAdress(){
    this.navCtrl.push(PersonalChangeaddresPage,{udata:this.udata});

  }

  goChangePas(){
    this.navCtrl.push(PersonalPasswordPage);
  }
  goout(){
    this.userSer.singout().then((data)=>data);
    console.log('guhtuih')
    console.log('hfjhjkdsf')
  }
  singoutall(){

  }


}
