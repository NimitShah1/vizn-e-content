import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgOtpInputModule } from 'ng-otp-input';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { Device } from '@ionic-native/device/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { EventService } from './services/EventService';
import { AuthGuard } from './shared/authguard.service';
import { Tools } from './shared/tools';
import { WelcomeGuard } from './shared/welcomGuard.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'var(--ion-color-main)',
  bgsOpacity: 0,
  bgsPosition: POSITION.bottomRight,
  bgsSize: 70,
  bgsType: SPINNER.circle,
  fgsColor: 'var(--ion-color-main)',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 70,
  fgsType: SPINNER.circle,
  hasProgressBar: false,
};

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgOtpInputModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot({ mode: 'md', scrollAssist: false }),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    BarcodeScanner,
    SplashScreen,
    Camera,
    Tools,
    FormBuilder,
    Device,
    Network,
    EventService,
    AuthGuard,
    WelcomeGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
