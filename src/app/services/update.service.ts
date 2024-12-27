import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Tools } from '../shared/tools';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Plugins } from '@capacitor/core';

const { NativeMarket } = Plugins

interface AppUpdate {
  current: string;
  enabled: boolean;
  msg?: {
    title: string;
    msg: string;
    btn: string;
  };
  majorMsg?: {
    title: string;
    msg: string;
    btn: string;
  };
  minorMsg?: {
    title: string;
    msg: string;
    btn: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  updateExample = 'https://devdactic.fra1.digitaloceanspaces.com/tutorial/version.json'
  maintenanceExample = 'https://devdactic.fra1.digitaloceanspaces.com/tutorial/maintenance.json'
  constructor(private http: HttpClient, private appVersion: AppVersion,
    private iab: InAppBrowser,
    public tools: Tools, private platform: Platform, public alertCtrl: AlertController) { }

  openAppstoreEntry() {
    //console.log('OPEN ME');
    if (this.platform.is('android')) {
      NativeMarket.openStoreListing({
        appId: 'com.qrtech.jeevandeep'
      });
    } else {
      this.iab.open('itms-apps://itunes.apple.com/app/id1469563885', '_blank');
    }
  }

  async checkUpdate() {
    this.http.get(this.updateExample).subscribe(async (info: AppUpdate) => {
      //console.log('result:', info);
      if (!info.enabled) {
        this.tools.openAlertToken(info.msg.title, info.msg.msg);
      } else {
        const versionNumber = await this.appVersion.getVersionNumber();
        // 1.2.0
        const splittedVersion = versionNumber.split('.');
        const serverVersion = info.current.split('.');

        if (serverVersion[0] > splittedVersion[0]) {
          this.presentAlert(info.majorMsg.title, info.majorMsg.msg, info.majorMsg.btn);
        } else if (serverVersion[1] > splittedVersion[1]) {
          this.presentAlert1(info.minorMsg.title, info.minorMsg.msg, info.minorMsg.btn, true);
        }
      }
    });
  }
  async presentAlert(title, msg, btn) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg ? msg : 'oops! something went wrong',
      buttons: btn,
      backdropDismiss: false
    });
    return await alert.present();
  }
  async presentAlert1(title, msg, btn, allowclose) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg ? msg : 'oops! something went wrong',
      buttons: btn,
      keyboardClose: allowclose,
      backdropDismiss: false
    });
    return await alert.present();
  }
}
