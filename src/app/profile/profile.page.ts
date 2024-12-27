import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Device } from '@ionic-native/device/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  updateForm: FormGroup;
  date: any;
  isedit: boolean = true;
  isShimmer: boolean = true;
  actualImageFile: any;
  ProfilePic: string = '';
  SubjectName: any;
  isWeb: any;

  constructor(
    public mdlctr: ModalController,
    private device: Device,
    private ngxService: NgxUiLoaderService,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    public tools: Tools,
    private router: Router,
    private navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private platform: Platform
  ) {
    this.updateForm = this.formBuilder.group({
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
      mobile: ['', [Validators.required]],
      BoardName: [''],
      StandardName: [''],
      SubjectName: [''],
      target: [''],
      dob: [''],
      gender: [''],
      address: [''],
      city: [''],
      location: [''],
      pincode: [''],
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
  ngOnInit() {
    this.GetProfileData();
  }

  dismiss() {
    this.mdlctr.dismiss();
  }

  onChangeDate(d) {
    let date = d.target.value;
  }
  GetProfileData() {
    if (this.tools.isNetwork()) {
      // this.ngxService.startLoader("loader-01");
      this.apiService.getProfileData().subscribe(
        (data) => {
          // this.ngxService.stopLoader("loader-01");
          this.isShimmer = false;
          let res: any = data.data.student_data;

          this.ProfilePic = res.ProfilePic;
          this.SubjectName = res.SubjectNames;
          this.updateForm.patchValue({
            student_name: res.StudentName,
            email: res.Email,
            mobile: res.MobileNo,
            BoardName: res.BoardName,
            StandardName: res.StandardName,
            SubjectName: this.SubjectName,
            dob: res.DOB,
            gender: res.Gender,
            address: res.Address,
            city: res.City,
            location: res.Location,
            pincode: res.Pincode,
          });
        },
        (error: Response) => {
          // this.ngxService.stopLoader("loader-01");
          //console.log(error);

          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    } else {
      // this.ngxService.stopLoader("loader-01");
    }
  }
  backPage() {
    this.navCtrl.back();
  }
  edit() {
    this.isedit = false;
  }
  UpdateProfile() {
    localStorage.setItem('Target', this.updateForm.get('target').value);
    if (this.tools.isNetwork()) {
      this.ngxService.startLoader('loader-01');

      let postData = new FormData();
      postData.append(
        'device_id',
        this.device.uuid != null ? this.device.uuid : '1595831596879'
      );
      postData.append(
        'student_name',
        this.updateForm.get('student_name').value
      );
      postData.append('email', this.updateForm.get('email').value);
      postData.append('dob', this.updateForm.get('dob').value);
      postData.append(
        'gender',
        this.updateForm.get('gender').value == null
          ? ''
          : this.updateForm.get('gender').value
      );
      postData.append(
        'address',
        this.updateForm.get('address').value == null
          ? ''
          : this.updateForm.get('address').value
      );
      postData.append(
        'city',
        this.updateForm.get('city').value == null
          ? ''
          : this.updateForm.get('city').value
      );
      postData.append(
        'location',
        this.updateForm.get('location').value == null
          ? ''
          : this.updateForm.get('location').value
      );
      postData.append(
        'pincode',
        this.updateForm.get('pincode').value == null
          ? ''
          : this.updateForm.get('pincode').value
      );

      if (this.actualImageFile) {
        const imageName = this.apiService.getUserId + '.jpeg';
        var imageBlob = this.apiService.dataURItoBlob(this.actualImageFile);
        postData.append('profile_pic', imageBlob, imageName);
      }
      this.apiService.ProfileUpdate(postData).subscribe(
        (response) => {
          this.ngxService.stopLoader('loader-01');
          let res: any = response;
          this.tools.openNotification(res.message);
          this.apiService.setUserData(
            res.data,
            localStorage.getItem('login_token')
          );
          this.router.navigateByUrl('/home/1', { replaceUrl: true });
        },
        (error: Response) => {
          this.ngxService.stopLoader('loader-01');
          let err: any = error;
          this.tools.openAlert(err.error.message);
        }
      );
    } else {
      this.ngxService.stopLoader('loader-01');
    }
  }
  Unsubscribe() {
    this.UnsubscribePopup();
  }
  async UnsubscribePopup() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to Delete Account',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Delete',
          handler: () => {
            this.DeactiveAccount();
          },
        },
      ],
      backdropDismiss: true,
    });
    return await alert.present();
  }
  DeactiveAccount() {
    if (this.tools.isNetwork()) {
      this.ngxService.startLoader('loader-01');
      let postData = new FormData();
      postData.append('status', '0');
      this.apiService.DeactiveAcount(postData).subscribe(
        (response) => {
          this.ngxService.stopLoader('loader-01');
          let res: any = response;
          this.tools.openNotification(res.message);
          localStorage.clear();
          localStorage.removeItem('killtechno_cart_data');
          localStorage.removeItem('user_id');
          localStorage.removeItem('login_token');
          localStorage.removeItem('killtechno_user_data');
          this.router.navigateByUrl('/login', { replaceUrl: true });
        },
        (error: Response) => {
          this.ngxService.stopLoader('loader-01');
          let err: any = error;
          this.tools.openNotification(err.message);
          this.tools.backPage();
        }
      );
    } else {
      this.ngxService.stopLoader('loader-01');
    }
  }

  scan() {
    this.router.navigateByUrl('linkdevice');
  }
  logout() {
    this.tools.presentLogout('Are You sure you want to Logout?', null, null);
    // this.tools.openAlertToken(200, 'hello');
  }
  switch() {
    this.router.navigateByUrl('switchprofile');
  }
  ///************* profile photo *************///

  async selectImage(type) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            if (type == '1') {
              this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            if (type == '1') {
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        //console.log('User Image --> ', imageData);
        this.actualImageFile = imageData;
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.ProfilePic = base64Image;
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.actualImageFile = file;

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.ProfilePic = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
