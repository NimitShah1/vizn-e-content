import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  isLogin: any;
  isWeb: any;
  imglink: any;
  constructor(private router: Router, public platform: Platform) {
    if (
      localStorage.getItem('isLogin') != null &&
      localStorage.getItem('isLogin') != ''
    ) {
      this.isLogin = true;
      setTimeout(() => {
        this.router.navigateByUrl('subjects', { replaceUrl: true });
      }, 2500);
    } else {
      this.isLogin = false;
      setTimeout(() => {
        this.router.navigateByUrl('login', { replaceUrl: true });
      }, 2500);
    }
    this.platform.ready().then(() => {
      if (this.platform.is('desktop') || this.platform.is('hybrid')) {
        if (
          this.platform.is('android') ||
          this.platform.is('ios') ||
          this.platform.is('iphone')
        ) {
          this.isWeb = false;
        } else {
          this.isWeb = true;
        }
      } else {
        this.isWeb = false;
      }
    });
  }

  ngOnInit() {
    this.imglink = environment.AssetURL;
  }
}
