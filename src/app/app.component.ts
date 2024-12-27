import {
  Component,
  NgZone,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonRouterOutlet,
  Platform,
  AlertController,
  ActionSheetController,
  PopoverController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  showTab: any;
  FROM_id: any;
  FROM: any;
  test_id: any;
  ChapterID: any;
  SubjectID: any;
  ChapterName: any;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private router: Router,
    public alert: AlertController,
    private splashScreen: SplashScreen,
    private toast: ToastController,
    public modalCtrl: ModalController,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.backButtonEvent();
    this.initializeApp();
  }
  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999, async () => {
      try {
        const element = await this.modalCtrl.getTop();
        const pop = await this.popoverCtrl.getTop();
        const alt = await this.alert.getTop();
        const action = await this.actionSheetCtrl.getTop();
        if (element || pop || alt || action) {
          pop.dismiss();
          element.dismiss();
          alt.dismiss();
          action.dismiss();
          return;
        }
      } catch (error) {
        //console.log(error);
      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (
          this.router.url === 'subjects' ||
          localStorage.getItem('Showtab') == '2' ||
          localStorage.getItem('ShowLogin') == 'login'
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator['app'].exitApp(); // work in ionic 4
          } else {
            this.presentToast('Press back again to exit App.');
            this.lastTimeBackPress = new Date().getTime();
          }
        } else if (localStorage.getItem('Showtab') == '3') {
          this.showTab = 2;
        } else if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }
      });
    });
  }
  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'middle',
      duration: 2000,
    });
    toast.present();
  }
}
