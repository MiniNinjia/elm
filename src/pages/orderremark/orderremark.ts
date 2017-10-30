import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, } from 'ionic-angular';

/**
 * Generated class for the OrderremarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderremark',
  templateUrl: 'orderremark.html',
})
export class OrderremarkPage {
  laIndex:any;
  xcIndex:any;


  laInde:any;
  num1:number;
  num2:number;
  num3:number;
  num4:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderremarkPage');
  }

  disMiss() {

    this.viewCtrl.dismiss();
  }
  la1(i){
    this.laIndex=i;
  }
  // la2(i){
  //
  //   this.laIndex1= i;
  //   this.laIndex = !i;
  //   this.laIndex2 = !i;
  // }
  // la3(i){
  //   this.laIndex2 = i;
  //   this.laIndex1 = !i;
  //   this.laIndex = !i;
  // }

  xc(j){
    this.xcIndex = j;
    this.xcIndex = !j;

  }
  chose(i){
    this.laInde=i;
  }

  chosee1(){
    this.num1=1;
  }
  chosee2(){
    this.num2=2;
  }
  chosee3(){
    this.num3=3;
  }
  chosee4(){
    this.num4=4;
  }


}
