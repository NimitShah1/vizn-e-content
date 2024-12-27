import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as $ from 'jquery';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';
@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  FROM_id: any;
  FROM: any;
  VideoID: any;
  VideoList: any = [];
  myDiv: any;
  Video: any;
  totalvideo: any;
  constructor(
    private apiService: ApiService,
    public tools: Tools,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) {
    if (
      localStorage.getItem('video') != null &&
      localStorage.getItem('video') != ''
    ) {
      this.Video = localStorage.getItem('video');
    } else {
      this.tools.openAlertToken('', 'Data not available');
    }
    this.VideoID = localStorage.getItem('videoid');
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#myDiv').bind('contextmenu', function () {
        return false;
      });
    });
  }
  videoId(VideoID) {
    if (this.tools.isNetwork()) {
      this.apiService.videocount(VideoID).subscribe(
        (data) => {
          let res: any = data;
          this.totalvideo = this.totalvideo + 1;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    }
  }
  ionViewWillLeave() {
    let mainVideo = <HTMLMediaElement>document.getElementById('myDiv');
    mainVideo.pause();
  }
  backPage() {
    this.navCtrl.back();
  }
}
