import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  FROM_id: any;
  FROM: any;
  title: any;
  shimmerView: any = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  isWeb: boolean;
  isShimmer: boolean = true;
  isShimmerList: boolean = true;
  DashboardList: any = [];
  dataList: any = [];
  ProfilePic: string = '';
  constructor(
    private ngxService: NgxUiLoaderService,
    private apiService: ApiService,
    private platform: Platform,
    public tools: Tools,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) {
    const navigation = this.router.getCurrentNavigation();
  }

  ngOnInit() {}
  ionViewWillEnter() {
    localStorage.removeItem('ShowLogin');
    this.dashboard();
    this.listData();
    this.ProfilePic = this.apiService.getUserData().ProfilePic;
    this.title = this.tools.showtitle(this.FROM);
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
  ionViewWillLeave() {
    this.DashboardList = [];
    this.dataList = [];
    this.isShimmer = true;
    this.isShimmerList = true;
    let mainVideo = <HTMLMediaElement>document.getElementById('myVideo');
    mainVideo.pause();
  }
  switch() {
    this.router.navigateByUrl('switchprofile');
  }
  dashboard() {
    if (this.tools.isNetwork()) {
      this.apiService.getDashboardData().subscribe(
        (data) => {
          let res: any = data;
          this.DashboardList = res.data.subject_list;
          this.isShimmer = false;
        },
        (error: Response) => {
          //console.log(error);
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    }
  }
  profile() {
    this.router.navigateByUrl('profile');
  }
  formatTime(seconds: number): string {
    const duration = Math.round(seconds);
    const minutes: number = Math.floor(duration / 60);
    const remainingSeconds: number = duration % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(val: number): string {
    return val < 10 ? '0' + val : val.toString();
  }
  GoToActiveKey() {
    this.router.navigateByUrl('activekey');
  }
  listData() {
    if (this.tools.isNetwork()) {
      this.apiService.getSubjectdataList().subscribe(
        (data) => {
          let res: any = data;
          this.dataList = res.data.videos;
          console.log('data>>>', this.dataList);
          this.isShimmerList = false;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    }
  }
  video(video, VideoID, chid, subid) {
    localStorage.setItem('video', video);
    localStorage.setItem('videoid', VideoID);
    this.router.navigateByUrl('video');
  }

  subject(SubjectID, SubjectName, icon) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        s_id: SubjectID,
        s_name: SubjectName,
      },
    };
    this.router.navigate(['selsubject'], navigationExtras);
  }
}
