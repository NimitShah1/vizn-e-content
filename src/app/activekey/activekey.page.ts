import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';
// import { Tools } from '../shared/tools';
// import { ApiService } from '../services/api.service-new';

@Component({
  selector: 'app-activekey',
  templateUrl: 'activekey.page.html',
  styleUrls: ['activekey.page.scss'],
})
export class ActivekeyPage implements OnInit {
  ActiveDataList: any = [];
  shimmerView = [1, 1, 1, 1, 1];
  activeCode: any;
  MediumName: any;
  StandardName: any;
  ExipryDate: any;
  msg: any;
  isWeb: any;
  ActiveForm: FormGroup;
  isShow: boolean = false;
  isShimmerList: boolean = true;
  constructor(
    public platform: Platform,
    private ngxService: NgxUiLoaderService,
    private apiService: ApiService,
    public tools: Tools,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    this.ActiveForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.maxLength(20)]],
    });
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
  ionViewDidEnter() {}
  ngOnInit() {
    this.activeList();
  }

  activekeyList() {
    if (this.tools.isNetwork()) {
      this.ngxService.startLoader('loader-01');
      this.apiService.ActivationKey(this.ActiveForm.get('key').value).subscribe(
        (data) => {
          this.ngxService.stopLoader('loader-01');
          let res: any = data;
          this.tools.openNotification(res.message);
          this.ActiveForm.reset();
          this.activeList();
        },
        (error: Response) => {
          this.ngxService.stopLoader('loader-01');
          let err: any = error;
          this.tools.openAlert('Access Code is Invalid');
        }
      );
    } else {
      this.ngxService.stopLoader('loader-01');
    }
  }

  activeList() {
    if (this.tools.isNetwork()) {
      this.apiService.ActivationList().subscribe(
        (data) => {
          this.isShimmerList = false;
          let res: any = data;
          this.ActiveDataList = res.data;
          this.msg = res.message;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    } else {
    }
  }

  backPage() {
    this.navCtrl.back();
  }
}
