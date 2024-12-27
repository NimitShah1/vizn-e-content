import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  AlertController,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  MenuController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';

@Component({
  selector: 'app-subvideolist',
  templateUrl: './subvideolist.page.html',
  styleUrls: ['./subvideolist.page.scss'],
})
export class SubvideolistPage implements OnInit {
  FROM: any;
  ChapterID: any;
  Videoid: any;
  SubjectID: any;
  shimmerView: any = [1, 1, 1, 1];
  isShimmer: boolean = true;
  isWeb: boolean;
  VideoList: any = [];
  pageno = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private ngxService: NgxUiLoaderService,
    private apiService: ApiService,
    public tools: Tools,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private platform: Platform,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router
  ) {
    // this.route.params.subscribe((params) => {
    //   this.ChapterID = params['ch_id'];
    //   this.SubjectID = params['s_id'];
    // });
    this.route.queryParams.subscribe((params) => {
      this.ChapterID = params['ch_id'];
      this.SubjectID = params['s_id'];
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.videoList(event);
    }, 1000);
  }
  ionViewWillEnter() {
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
  onIonInfinite(ev) {
    this.videoList(ev);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  videoList(ev) {
    if (this.tools.isNetwork()) {
      this.apiService.VideoList(this.ChapterID, this.pageno).subscribe(
        async (data) => {
          let res: any = data;
          this.isShimmer = false;
          if (this.isWeb && res.message == 'Coming Soon') {
            this.tools.openAlertToken(400, res.message);
          }
          if (res.data.chapter_videos.length > 0) {
            this.VideoList = this.VideoList.concat(res.data.chapter_videos);
            this.pageno++;
          } else {
            this.infiniteScroll.disabled = true;
            if (res.data.chapter_videos.length == 0 && this.pageno == 1) {
              this.tools.openAlertToken(res.status, res.message);
            }
          }
          if (ev) {
            ev.target.complete();
          }
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    } else {
    }
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
  backPage() {
    this.navCtrl.back();
  }
  video(video, VideoID) {
    localStorage.setItem('video', video);
    localStorage.setItem('videoid', VideoID);
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     s_id: this.SubjectID,
    //     ch_id: this.ChapterID,
    //   },
    // };
    this.router.navigateByUrl('video');
  }
}
