import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobleServiceProvider} from '../globle-service/globle-service'
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/services/cookies.service';


/*
 Generated class for the UserServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class UserServiceProvider {
  _url = this.glo.serverUrl;
  _uploadUrl = this.glo.uploadUrl;

  constructor(private http: HttpClient,
              private _cookieService: CookieService,
              public glo: GlobleServiceProvider,) {
    console.log('Hello UserServiceProvider Provider');
  }

  //获取用户信息
  getUsermessage(id): Promise<any> {
    return this.http.get(this._url + '/v1/user/' + id).toPromise().then((data) => data)
  }

  //获取用户地址
  getUseraddress(id): Promise<any> {
    return this.http.get(this._url + '/v1/users/' + id + '/addresses').toPromise().then((data) => data)
  }


//  修改用户密码
  changePassword(passdata): Promise<any> {
    return this.http.post(this._url + '/v2/changepassword', passdata, {withCredentials: true}).toPromise().then((data) => data)
  }

  //获取验证码
  getcode(): Promise<any> {
    return this.http.post(this._url + '/v1/captchas', {}, {withCredentials: true}).toPromise().then((data) => {
      return data
    })
  }


//  获取搜索地址
  getsearchaddress(cid, ads): Promise<any> {
    return this.http.get(this._url + '/v1/pois?city_id=' + cid + '&keyword=' + ads + '&type=search').toPromise().then((data) => data)
  }

//  添加收货地址
  addadres(id,data) {
    return this.http.post(this._url + '/v1/users/' + id + '/addresses', data).toPromise().then((data) => data)
  }

  getOrderList(userid, offset) {
    return this.http.get(this._url + '/bos/v2/users/' + userid + '/orders?limit=10&offset=' + offset).toPromise().then((data) => data)
  }

  //删除收货地址
  //http://cangdu.org:8001/v1/users/:user_id/addresses/:address_id
  deladdres(id, adresid) {
    return this.http.delete(this._url + '/v1/users/' + id + '/addresses/' + adresid).toPromise().then((data) => data)

  }

  singout() {
    return this.http.get(this._url + '/v2/signout').toPromise().then((data) => data)
  }

  login(data) {
    return this.http.post(this._url + '/v2/login', data, {withCredentials: true}).toPromise().then((data) => data)
  }
}
