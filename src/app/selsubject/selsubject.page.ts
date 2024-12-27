import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service-new';
import { Tools } from '../shared/tools';

@Component({
  selector: 'app-selsubject',
  templateUrl: './selsubject.page.html',
  styleUrls: ['./selsubject.page.scss'],
})
export class SelsubjectPage implements OnInit {
  FROM_id: any;
  FROM: any;
  SubjectID: any;
  SubjectName: any;
  paper: any;
  isModalOpen = false;
  ChapterList: any = [];
  public finalOrderValue: any = 0;
  public orderId: any;
  public rzpOrder: any;
  public paymentId: any;
  imglink: any;
  shimmerView: any = [1, 1, 1, 1, 1];
  isShimmer: boolean = true;
  constructor(
    public mdlctr: ModalController,
    private ngxService: NgxUiLoaderService,
    private apiService: ApiService,
    public tools: Tools,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.paper = localStorage.getItem('Past-paper');
    const navigation = this.router.getCurrentNavigation();
  }

  ngOnInit() {
    this.imglink = environment.AssetURL;

    this.activatedRoute.queryParams.subscribe((params) => {
      // this.itemdata = JSON.parse(params['special'.toString()]);
      this.SubjectID = params['s_id'];
      this.SubjectName = params['s_name'];
    });

    // this.route.params.subscribe((params) => {
    //   this.SubjectID = params['s_id'];
    //   this.SubjectName = params['s_name'];
    // });
    this.chapterlist();
    // this.tools.openAlertToken(200, 'hello');
  }
  backPage() {
    localStorage.removeItem('morevideo');
    this.navCtrl.back();
  }
  analysis() {
    this.router.navigateByUrl('comingsoon');
  }
  chapterlist() {
    if (this.tools.isNetwork()) {
      this.apiService.ChapterList(this.SubjectID).subscribe(
        (data) => {
          let res: any = data;
          if (res.data.length == 0) {
            this.tools.openAlertToken('', 'Chapters not available');
          }
          this.ChapterList = res.data;
          this.isShimmer = false;
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    }
  }
  chname(ChapterID, ChapterName) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        s_id: this.SubjectID,
        ch_id: ChapterID,
      },
    };
    this.router.navigate(['subvideolist'], navigationExtras);
  }
  cancel_sub() {
    this.isModalOpen = false;
    this.mdlctr.dismiss();
  }
}
