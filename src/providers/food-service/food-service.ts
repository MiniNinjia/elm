import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobleServiceProvider} from '../globle-service/globle-service'
/*
 Generated class for the FoodServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class FoodServiceProvider {

  constructor(public http: Http,
              public glo: GlobleServiceProvider) {
    console.log('Hello FoodServiceProvider Provider');
  }

  _url = this.glo.serverUrl;

  getfood(id, callback) {
    this.http.get(this._url + '/shopping/v2/menu?restaurant_id=1' ).subscribe(
      function (result) {
        callback(result);
      }
    );
  }

  getdiaryList(postdata: any, callback) {
    this.http.post(this._url + '/diary', postdata).subscribe(
      function (result) {
        callback(result);
      }
    );
  }
}
