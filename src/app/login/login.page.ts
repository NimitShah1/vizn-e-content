import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MenuController,
  AlertController,
  ToastController,
  PopoverController,
  PopoverOptions,
  Platform,
} from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Device } from '@ionic-native/device/ngx';
import { Subscription } from 'rxjs';
import { NgOtpInputComponent } from 'ng-otp-input';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  app = 'VIZN E-Content';
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: NgOtpInputComponent;
  showTab: any = 1;
  st: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  ActiveForm: FormGroup;
  isOtp: boolean = false;
  ismedium: boolean = false;
  isstandard: boolean = false;
  getOTP = false;
  BoardList: any = [];
  MediumList: any = [];
  StandardList: any = [];
  BoardID: any = '0';
  BoardName: any;
  MediumID: any = '0';
  MediumName: any;
  StandardID: any = '0';
  StandardName: any;
  device_id = '';
  Result: any;
  notification: any;
  otpLength: any;
  isShow: boolean = false;
  isTimer: boolean = false;
  isNext: boolean = false;
  isboard: boolean;
  ismed: boolean;
  isstd: boolean;
  isback: boolean;
  isicon: boolean = false;
  isphone: boolean = false;
  //timer
  isOtpShow: boolean;
  remainingTime = 120;
  TIME: any = 0;
  isWeb: any;
  isItemAvailable = true;
  isapicall = true;
  items = [];

  counter: any;
  qrimg: any;
  machineId: any;
  imglink: any;
  private apiSubscription: Subscription;
  constructor(
    public platform: Platform,
    public popoverController: PopoverController,
    private device: Device,
    private ngxService: NgxUiLoaderService,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    public tools: Tools,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      mobileno: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      otp: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('[0-9]+'),
        ],
      ],
    });
    this.ActiveForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.registerForm = this.formBuilder.group({
      student_name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]+')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-_{2,12}]+.[a-z]{2,4}'),
        ],
      ],
      location: [''],
      // Board_ID: ['', [Validators.required]],
      // Medium_ID: ['', [Validators.required]],
      // Standard_ID: ['', [Validators.required]],
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

          this.qrgen();
        }
      } else {
        this.isWeb = false;
      }
    });
  }
  BoardOptions = {
    header: 'Select Board',
  };
  MediumOptions = {
    header: 'Select Medium',
  };
  StandardOptions = {
    header: 'Select Standard',
  };
  ngOnInit() {
    this.imglink = environment.AssetURL;
    this.machineId = localStorage.getItem('MachineId');
    if (!this.machineId) {
      this.machineId = crypto.randomUUID();
      localStorage.setItem('MachineId', this.machineId);
    }
    // console.log("this.machineId >>",this.machineId)
    localStorage.setItem('Profile', '');

    //console.log('showTab >>>>>>>>', this.showTab)
  }
  valid(ev) {
    if (ev.detail.value != null && ev.detail.value != '') {
      this.isicon = true;
    } else {
      this.isicon = false;
    }

    //console.log("email ev >>>>>>>>>>>>>>>>>>>>>>>>>>", ev)
  }
  toggleDisplay(index) {
    if (this.showTab == 2) {
      if (this.ActiveForm.valid) {
        this.activekeyList();
      }
    }
    this.showTab = index;
    if (this.showTab == 3) {
      localStorage.setItem('Showtab', '3');
      localStorage.removeItem('ShowLogin');
      this.board();
    }
  }
  phone() {
    this.isphone = !this.isphone;
  }
  backPage() {
    this.showTab = 2;
    localStorage.removeItem('ShowLogin');
    localStorage.setItem('Showtab', '2');
    // if(this.showTab != 1 || this.showTab != 2){
    //   this.showTab = this.showTab - 1;
    //   //console.log(' this.showTab > ', this.showTab);
    //   this.isback = true;
    // }
    // else{
    //   this.isback = false;
    //   localStorage.removeItem('ShowLogin');
    //   localStorage.setItem('Showtab','2')
    // }
  }
  SendOTP(IsResend) {
    if (this.tools.isNetwork()) {
      console.log('in isNetwork');
      this.apiService.sendOtp(this.loginForm.get('mobileno').value).subscribe(
        (response) => {
          console.log('in API response');
          let res: any = response;
          if (res.status) {
            this.isOtp = true;
            if (IsResend == 0) {
              this.isTimer = true;
            }
            this.Result = res.data;
            if (IsResend == 0) {
              this.startTimer();
              this.isShow = false;
            } else {
              this.isShow = true;
            }
          }
        },
        (error: Response) => {
          console.log('in API error', error);
          let err: any = error;
          this.getOTP = false;
          this.isOtp = false;
          this.isTimer = false;
          this.tools.openAlert(err.error.message);
        }
      );
    } else {
    }
  }
  startTimer() {
    this.counter = setTimeout(() => {
      this.TIME = this.getTimerClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.startTimer();
        this.remainingTime--;
      } else {
        clearInterval(this.counter);
        this.isTimer = false;
        this.isShow = true;
      }
    }, 1000);
  }
  getTimerClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    this.remainingTime = sec_num; //Define variable
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = hours < 10 ? '0' + hours : hours.toString();
    minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }
  onOtpChange(event) {
    this.otpLength = event;
    if (this.otpLength.length == 4) {
      this.isNext = true;
    } else {
      this.isNext = false;
    }
  }
  verify() {
    if (
      this.Result.otp == this.otpLength ||
      this.Result.DefaultOTP == this.otpLength
    ) {
      this.loginForm.reset();
      this.ngxService.startLoader('loader-01');
      if (this.Result.is_registred == 0) {
        clearInterval(this.counter);
        this.ngxService.stopLoader('loader-01');
        this.showTab = 2;
        this.st = this.showTab;
        localStorage.setItem('Showtab', this.st);
      } else {
        localStorage.setItem('login_token', this.Result.login_token);
        localStorage.setItem('isLogin', 'true');
        this.apiService.setUserData(
          this.Result.student_data,
          this.Result.login_token
        );
        localStorage.removeItem('ShowLogin');
        this.ngxService.stopLoader('loader-01');
        this.router.navigateByUrl('subjects', { replaceUrl: true });
      }
    } else {
      this.tools.openNotification('Invalid Verification code');
    }
  }
  activekeyList() {
    if (this.tools.isNetwork()) {
      this.apiService
        .ActivationKeylogin(this.ActiveForm.get('key').value)
        .subscribe(
          (data) => {
            let res: any = data;
            this.tools.openNotification(res.message);
          },
          (error: Response) => {
            let err: any = error;
            this.tools.openNotification('Activation Code is invalid');
          }
        );
    } else {
    }
  }
  qrgen() {
    if (this.tools.isNetwork()) {
      this.apiService.qrgenrate(this.machineId).subscribe(
        (data) => {
          let res: any = data;
          this.qrimg = res.qr_code;
          this.afterscan();
        },
        (error: Response) => {
          let err: any = error;
        }
      );
    } else {
    }
  }
  afterscan() {
    if (this.isapicall) {
      if (this.tools.isNetwork()) {
        this.apiSubscription = this.apiService
          .afterscaned(this.machineId)
          .subscribe(
            (data) => {
              let res: any = data;
              this.apiService.setUserData(res.student_data, res.login_token);
              this.router.navigateByUrl('subjects', { replaceUrl: true });
            },
            (error: Response) => {
              setTimeout(() => {
                this.afterscan();
              }, 2000);
              let err: any = error;
            }
          );
      } else {
      }
    }
  }
  ionViewWillLeave() {
    this.isapicall = false;
  }
  ionViewWillEnter() {
    localStorage.setItem('ShowLogin', 'login');
  }
  register() {
    if (this.tools.isNetwork()) {
      this.apiService
        .UserRegister(
          this.Result.mobile_no,
          this.registerForm.get('student_name').value,
          this.registerForm.get('email').value,
          this.registerForm.get('location').value,
          this.device.uuid != null ? this.device.uuid : '1595831596879',
          this.BoardID,
          this.MediumID,
          this.StandardID,
          this.ActiveForm.get('key').value
        )
        .subscribe(
          (response) => {
            let res: any = response;
            localStorage.setItem('login_token', res.data.login_token);
            localStorage.setItem('isLogin', 'true');
            this.apiService.setUserData(res.data.student, res.data.login_token);
            localStorage.removeItem('Showtab');
            localStorage.removeItem('ShowLogin');
            this.router.navigateByUrl('subjects', { replaceUrl: true });
          },
          (error: Response) => {
            let err: any = error;
            this.tools.openNotification(err.error.message);
            this.showTab = 2;
          }
        );
    }
  }
  board() {
    if (this.tools.isNetwork()) {
      this.apiService.BoardList().subscribe(
        (data) => {
          let res: any = data;
          this.BoardList = res.data;
          this.isboard = true;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlert(err.error.message);
        }
      );
    }
  }
  onChangeBoard(event) {
    this.BoardID = event.detail.value.split(',')[0];
    this.BoardName = event.detail.value.split(',')[1];
    this.ismedium = true;
    this.isboard = false;
    this.medium();
  }
  onChangeMedium(event) {
    this.MediumID = event.detail.value.split(',')[0];
    this.MediumName = event.detail.value.split(',')[1];
    this.isstandard = true;
    this.ismed = false;
    this.standard();
  }
  onChangeStandard(event) {
    this.StandardID = event.detail.value.split(',')[0];
    this.StandardName = event.detail.value.split(',')[1];
    this.isstd = false;
  }
  medium() {
    if (this.tools.isNetwork()) {
      this.apiService.MediumList(this.BoardID).subscribe(
        (data) => {
          let res: any = data;
          this.MediumList = res.data;
          this.ismed = true;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlert(err.error.message);
        }
      );
    }
  }
  standard() {
    if (this.tools.isNetwork()) {
      this.apiService.StandardList(this.MediumID).subscribe(
        (data) => {
          let res: any = data;
          this.StandardList = res.data;
          this.isstd = true;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlert(err.error.message);
        }
      );
    }
  }
}
