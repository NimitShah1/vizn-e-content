import {
  ToastController,
  LoadingController,
  AlertController,
  NavController,
  Platform,
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { ApiService } from '../services/api.service-new';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Tools {
  public razorPayCallback = 'razorpay-callback';
  expMonth = [];
  expYear = [];
  cartType = ['Visa', 'MasterCard', 'American Express', 'Diners'];
  notification;
  loading;
  CountryCodes = [];
  CountryCodes_0 = [];
  // remainingTime:any;
  // TIME:any;
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private apiServices: ApiService,
    public toastController: ToastController,
    public network: Network,
    private platform: Platform,
    public loadingController: LoadingController,
    public router: Router,
    private navCtrl: NavController
  ) {
    this.expMonth = [];
    this.expMonth.push({ key: 'January', val: '01' });
    this.expMonth.push({ key: 'February', val: '02' });
    this.expMonth.push({ key: 'March', val: '03' });
    this.expMonth.push({ key: 'April', val: '04' });
    this.expMonth.push({ key: 'May', val: '05' });
    this.expMonth.push({ key: 'June', val: '06' });
    this.expMonth.push({ key: 'July', val: '07' });
    this.expMonth.push({ key: 'August', val: '08' });
    this.expMonth.push({ key: 'September', val: '09' });
    this.expMonth.push({ key: 'October', val: '10' });
    this.expMonth.push({ key: 'November', val: '11' });
    this.expMonth.push({ key: 'December', val: '12' });
    this.expYear = [];
    var ctYear = new Date().getFullYear().toString();
    for (let i = 0; i < 15; i++) {
      this.expYear.push(parseInt(ctYear) + i);
    }
    // console.log("expYear ",this.expYear)
    //   this.CountryCodes=[{"name":"Jersey","flag":"🇯🇪","code":"JE","dial_code":"+44"}]
  }

  backPage() {
    this.navCtrl.back();
  }
  platformname() {
    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        //console.log("IF>>",this.platform.platforms())
        var isweb = true;
        return isweb;
      } else {
        //console.log("ELSE>>",this.platform.platforms())
        var isweb = false;
        return isweb;
      }
    });
  }
  LoadScript() {
    setTimeout(() => {
      var imported = document.createElement('script');
      imported.src = 'https://web.vizn.co.in/assets/js/jqmath-etc-0.4.6.min.js';
      document.head.appendChild(imported);
    }, 1000);
  }

  // getPlayerID() {
  //   //console.log('tool 60 in >>>>>');
  //   var P_id;
  //   this.oneSignal.getIds().then((id) => {
  //     P_id = id.userId;
  //   });
  //   return P_id;
  // }
  convertVal(calVal) {
    // console.log('calValue ',calVal);
    if (calVal != undefined) {
      return parseFloat(calVal).toFixed(2);
    } else {
      return 0.0;
    }
  }
  isNetwork() {
    // if (this.network.type != null) {
    if (this.network.type == 'none') {
      this.closeLoader();
      this.presentAlert(
        'No internet',
        'You are not connected to the internet. Please check your connection and try again.',
        'Retry'
      );
      return false;
    } else {
      return true;
    }
    // } else {
    //   console.log("Network tools else 1 >>>", this.network.type);
    //   return true;
    // }
  }
  dataURItoBlobNew(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  formatePhone(phoneNumber) {
    let phoneString = phoneNumber.replace(/[^a-zA-Z0-9]/g, '');
    return phoneString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  async openNotification(msg) {
    this.notification = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      cssClass: 'info',
    });
    this.notification.present();
  }
  async formateDateyyyymmddhis(date) {
    // tslint:disable-next-line:prefer-const
    let mm = ('0' + (date.getMonth() + 1)).slice(-2);
    // tslint:disable-next-line:prefer-const
    let dd = ('0' + date.getDate()).slice(-2);
    // tslint:disable-next-line:prefer-const
    let yyyy = date.getFullYear();
    // tslint:disable-next-line:prefer-const
    let h = ('0' + date.getHours()).slice(-2);
    // tslint:disable-next-line:prefer-const
    let i = ('0' + date.getMinutes()).slice(-2);
    // tslint:disable-next-line:prefer-const
    let s = ('0' + date.getSeconds()).slice(-2);
    // tslint:disable-next-line:prefer-const
    let today = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + i + ':' + s;
    return today;
  }

  async formateDay(today) {
    let dd = today.getDate();
    // tslint:disable-next-line:prefer-const
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // January is 0!

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  async formatAMPM1(date) {
    // console.log(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    // tslint:disable-next-line:prefer-const
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // tslint:disable-next-line:prefer-const
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  async formatAMPM(date) {
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    // tslint:disable-next-line:prefer-const
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // tslint:disable-next-line:prefer-const
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  async openLoader(msg?, time?) {
    this.loading = await this.loadingController.create({
      message: '', //,msg ? msg : 'Please wait...',
      spinner: null,
      keyboardClose: true,
      showBackdrop: true,
      backdropDismiss: false,
      // cssClass: cssClass
      cssClass: 'custom-loading',
    });

    await this.loading.present();
  }
  showtitle(ttl) {
    var tittle;
    if (ttl == 'MCQ') {
      tittle = 'PAST PAPERS';
    } else if (ttl == 'ENT') {
      tittle = 'E-NOTES';
    } else if (ttl == 'VDO') {
      tittle = 'VIDEOS';
    } else if (ttl == 'HOME') {
      tittle = 'SELECT SUBJECT';
    } else if (ttl == 'PAST') {
      tittle = 'PAST PAPERS';
    } else if (ttl == 'MIND') {
      tittle = 'MIND MAP';
    } else if (ttl == 'EXP') {
      tittle = 'EXPLORE MORE';
    } else if (ttl == 'PRE') {
      tittle = 'PRELIM PAPERS';
    } else {
      tittle = 'SELECT SUBJECT';
    }
    return tittle;
  }
  async openAlert(message) {
    const alert = await this.alertController.create({
      message: message ? message : 'oops! something went wrong',
      buttons: ['OK'],
      backdropDismiss: false,
    });
    return await alert.present();
  }
  async openAlerts(message) {
    const alert = await this.alertController.create({
      message: message ? message : 'oops! something went wrong',
      buttons: ['Cancel'],
      backdropDismiss: false,
    });
    return await alert.present();
  }
  async openAlertToken(status, message) {
    const alert = await this.alertController.create({
      message: message ? message : 'oops! something went wrong',
      buttons: [
        {
          text: status == 401 ? 'Login' : 'Ok',
          handler: () => {
            if (status == 401) {
              localStorage.clear();
              localStorage.removeItem('user_id');
              localStorage.removeItem('login_token');
              window.localStorage.clear();
              window.localStorage.removeItem['login_token'];
              this.router.navigateByUrl('/login', { replaceUrl: true });
            } else {
              this.navCtrl.back();
            }
          },
        },
      ],
      backdropDismiss: false,
    });
    return await alert.present();
  }
  checkUrlStatus(url: string) {
    this.http.head(url, { observe: 'response' }).subscribe(
      (response) => {
        if (response.status === 200) {
          //console.log('URL is accessible.');
        } else if (response.status === 404) {
          console.error('URL returns a 404 Not Found response.');
        } else {
          console.error(
            'URL returned an unexpected status code:',
            response.status
          );
        }
      },
      (error) => {
        console.error('Error checking URL:', error);
      }
    );
  }

  async presentLogout(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: btnNo ? btnNo : 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: btnYes ? btnYes : 'Yes',
          handler: () => {
            localStorage.clear();
            // localStorage.removeItem('killtechno_cart_data');
            // localStorage.removeItem('user_id');
            // localStorage.removeItem('login_token');
            // localStorage.removeItem('killtechno_user_data');

            this.router.navigateByUrl('/login', { replaceUrl: true });
          },
        },
      ],
      backdropDismiss: true,
    });
    return await alert.present();
  }
  async presentAlertToLogin(title, msg, btnOk, page?) {
    this.closeLoader();
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: btnOk,
          handler: () => {
            localStorage.clear();
            localStorage.removeItem('user_id');
            localStorage.removeItem('login_token');
            this.router.navigateByUrl('/login', { replaceUrl: true });
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlert(title, msg, btnOk?, isMove?, cancel?) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      backdropDismiss: cancel != undefined ? false : true,
      buttons: [
        {
          text: btnOk != undefined ? btnOk : 'Ok',
          handler: () => {
            if (isMove) {
              this.router.navigateByUrl('/dashboard', { replaceUrl: true });
            } else if (btnOk == 'Retry') {
              window.location.reload();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentConfirm(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message ? message : 'Do you want to buy this book?',
      buttons: [
        {
          text: btnNo ? btnNo : 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
        {
          text: btnYes ? btnYes : 'Yes',
          handler: () => {
            // console.log('Buy clicked');
          },
        },
      ],
      backdropDismiss: false,
    });
    return await alert.present();
  }
  async closeLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }
    // while (await this.loadingController.getTop() !== undefined) {
    //     await this.loadingController.dismiss();
    //   }

    if (this.loading)
      this.loading
        .dismiss()
        .then(() => {
          this.loading = null;
        })
        .catch((e) => console.log('Loader ', e));
  }
  //     logout(){

  //             if (this.isNetwork()) {
  //               this.openLoader();
  //               this.apiServices.logout().subscribe(response => {
  //                 this.closeLoader();
  //                 let res: any = response;
  //                 if (res.code == 1) {
  //                     localStorage.setItem('cui-data','');
  //                     localStorage.setItem('login_token','');
  //                     localStorage.clear();

  //                     this.router.navigateByUrl('/login/home', { replaceUrl: true });
  //                   console.log('Api  ', res.details);
  //                 } else if (res.code == 2) {
  //                   this.presentAlert('', res.msg);
  //                 }

  //               }, (error: Response) => {
  //                 this.closeLoader();
  //                 let err: any = error;
  //                 console.log('Api Error ', err);
  //               });
  //             } else {
  //               this.closeLoader();
  //             }
  //    }
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    // tslint:disable-next-line:prefer-const
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    // tslint:disable-next-line:prefer-const
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
      type: mimeString,
    });
  }

  returnImageName(keys, file, blob) {
    let imageName;
    if (blob) {
      imageName = new Date().getTime() + keys + '.jpg';
      blob.lastModified = new Date();
      blob.name = imageName;
    } else {
      imageName = new Date().getTime() + keys + file.name;
    }
    imageName.replace(/_/g, ' ');
    imageName = imageName.replace(/\s+/g, '-');
    imageName = imageName.replace(/%20/g, '_');
    return imageName;
  }

  GoToActiveKey() {
    this.router.navigateByUrl('activekey');
  }
}
