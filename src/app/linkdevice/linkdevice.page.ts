import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service-new';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-linkdevice',
  templateUrl: './linkdevice.page.html',
  styleUrls: ['./linkdevice.page.scss'],
})
export class LinkdevicePage implements OnInit {
  app = 'VIZN E-Content';
  scannedData: any;
  imglink: any;
  isloggedin: any = 1;
  constructor(
    private apiService: ApiService,
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.imglink = environment.AssetURL;
  }
  backPage() {
    this.navCtrl.back();
  }
  scan() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats:
        'QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED,PDF_417,AZTEC,MSI',
      orientation: 'portrait',
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        this.scannedData = barcodeData;
        if (barcodeData.text !== '' && barcodeData.cancelled == false) {
          this.apiService
            .qrlogin(barcodeData.text, this.apiService.getUserData().MobileNo)
            .subscribe(
              (data) => {
                let res: any = data;
                this.isloggedin = 2;
                setTimeout(() => {
                  this.router.navigateByUrl('subjects', { replaceUrl: true });
                }, 3000);
                console.log('qr gen >', res);
              },
              (error: Response) => {
                this.isloggedin = 3;
                let err: any = error;
              }
            );
        } else if (barcodeData.text == '' && barcodeData.cancelled == true) {
          this.isloggedin = 3;
        }
      })
      .catch((err) => {
        this.isloggedin = 3;
      });
  }
}
