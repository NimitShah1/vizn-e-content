import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tools } from '../shared/tools';
import { ApiService } from '../services/api.service-new';

@Component({
  selector: 'app-switchprofile',
  templateUrl: './switchprofile.page.html',
  styleUrls: ['./switchprofile.page.scss'],
})
export class SwitchprofilePage implements OnInit {
  standarList: any = [];
  shimmerView = [1, 1, 1, 1];
  selectedStudentTypeID: string;
  isShimmerList: boolean = true;
  constructor(
    private navCtrl: NavController,
    public tools: Tools,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.GetStandardData();
  }
  selectUser(studentTypeID: string) {
    this.selectedStudentTypeID = studentTypeID;
  }
  GetStandardData() {
    if (this.tools.isNetwork()) {
      this.apiService.getStandardData().subscribe(
        (data) => {
          let res: any = data;
          this.isShimmerList = false;
          this.standarList = res.data.standards;
          console.log(this.standarList);
          const activeStandard = this.standarList.find((s) => s.Active == '1');
          if (activeStandard) {
            this.selectedStudentTypeID = activeStandard.StudentTypeID;
          }
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.message);
        }
      );
    }
  }
  backPage() {
    this.navCtrl.back();
  }
  save() {
    if (this.tools.isNetwork()) {
      this.apiService.setStandardData(this.selectedStudentTypeID).subscribe(
        (data) => {
          let res: any = data;
          this.tools.openNotification(res.message);
          this.navCtrl.back();
        },
        (error: Response) => {
          let err: any = error;
          this.tools.openAlert('Something went wrong, Please try again.');
        }
      );
    }
  }
}
