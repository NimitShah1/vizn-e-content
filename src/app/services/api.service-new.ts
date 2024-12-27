import { AuthGuard } from './../shared/authguard.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Device } from '@ionic-native/device/ngx';
// import { OneSignal } from "@ionic-native/onesignal/ngx";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  deviceInfo;
  bacisAuth;
  options;
  httpOptions: any;
  device_id = '';
  device_details = null;
  public remember_token: any;

  constructor(
    public auth: AuthGuard,
    private http: HttpClient,
    private device: Device
  ) {
    //console.log('Device UUID is: ', this.device);
    this.deviceInfo = this.getDeviceInfo();
    this.device_id =
      this.device.uuid != null ? this.device.uuid : '1595831596879';
    //console.log('device_id ', this.device_id);
    this.device_details = this.device.platform;

    this.bacisAuth =
      'Basic ' + btoa(environment.username + ':' + environment.password);

    // this.callOneSignal();
    this.setHeaderData();
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  setHeaderData() {
    if (this.getLoginToken() == '') {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          Authorization: this.bacisAuth,
          'X-JEEVANDEEP-API-KEY': environment.apikey,
        }),
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          Authorization: this.bacisAuth,
          'X-JEEVANDEEP-API-KEY': environment.apikey,
          'User-Id': this.getUserId(),
          'X-JEEVANDEEP-LOGIN-TOKEN': this.getLoginToken(),
          device_id: this.device_id,
        }),
      };
    }
  }

  //login----------

  sendOtp(mobileNo) {
    this.setHeaderData();
    // var httpOptionss = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //     // 'Access-Control-Allow-Headers': '*',
    //     // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    //     'Authorization': this.bacisAuth,
    //     'X-JEEVANDEEP-API-KEY': environment.apikey,
    //   })
    // };

    let postData = new FormData();
    postData.append('mobile_no', mobileNo);
    return this.http.post(
      environment.BaseUrl + 'auth/send_otp',
      postData,
      this.httpOptions
    );
    // return this.http.get(environment.BaseUrl + 'dashboard', this.httpOptions);
  }

  Userlogin(mobileNo, otp) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('mobile_no', mobileNo);
    postData.append('Otp', otp);
    return this.http.post(
      environment.BaseUrl + 'auth/login',
      postData,
      this.httpOptions
    );
  }
  qrgenrate(browser_id) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('browser_id', browser_id);
    return this.http.post(
      environment.BaseUrl + 'qr-login',
      postData,
      this.httpOptions
    );
  }
  afterscaned(browser_id) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('browser_id', browser_id);
    return this.http.post(
      environment.BaseUrl + 'qr-login/check-login',
      postData,
      this.httpOptions
    );
  }
  qrlogin(browser_id, mobileNo) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('browser_id', browser_id);
    postData.append('mobile_no', mobileNo);
    return this.http.post(
      environment.BaseUrl + 'qr-login/scan',
      postData,
      this.httpOptions
    );
  }

  UserRegister(
    mobileNo,
    student_name,
    email,
    location,
    device_id,
    board_id,
    medium_id,
    standard_id,
    key
  ) {
    this.setHeaderData();

    let postData = new FormData();
    postData.append('mobile_no', mobileNo);
    postData.append('student_name', student_name);
    postData.append('email', email);
    postData.append('location', location);
    postData.append('device_id', device_id);
    postData.append('board_id', board_id);
    postData.append('medium_id', medium_id);
    postData.append('standard_id', standard_id);
    postData.append('active_key', key);
    // postData.append("class_id", "2322");
    //console.log('postdata', postData)
    return this.http.post(
      environment.BaseUrl + 'auth/register_new',
      postData,
      this.httpOptions
    );
  }

  BoardList(): any {
    return this.http.get(
      environment.BaseUrl + 'lists/board-list',
      this.httpOptions
    );
  }

  MediumList(baord_id) {
    let postData = new FormData();
    postData.append('board_id', baord_id);
    return this.http.post(
      environment.BaseUrl + 'lists/medium-list',
      postData,
      this.httpOptions
    );
  }

  StandardList(medium_id) {
    let postData = new FormData();
    postData.append('medium_id', medium_id);
    return this.http.post(
      environment.BaseUrl + 'lists/standard-list',
      postData,
      this.httpOptions
    );
  }

  //dashboard-----------

  getDashboardData(): any {
    this.setHeaderData();

    return this.http.get(environment.BaseUrl + 'dashboard', this.httpOptions);
  }

  ActivationKeylogin(key) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('key', key);
    return this.http.post(
      environment.BaseUrl + 'subscribe/check_activation_key',
      postData,
      this.httpOptions
    );
  }
  ActivationKey(key) {
    let postData = new FormData();
    postData.append('key', key);
    return this.http.post(
      environment.BaseUrl + 'subscribe/activation-key',
      postData,
      this.httpOptions
    );
  }

  ChapterList(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'chapters',
      postData,
      this.httpOptions
    );
  }
  Enotes_ChapterList(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'chapters/enotes_chapters',
      postData,
      this.httpOptions
    );
  }
  TextbookList(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'lists/textbook-list',
      postData,
      this.httpOptions
    );
  }

  ChapterDetailList(subject_id, chapter_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    postData.append('chapter_id', chapter_id);
    return this.http.post(
      environment.BaseUrl + 'chapters/detail',
      postData,
      this.httpOptions
    );
  }

  QuestionTypesList(chapter_id, question_type_id) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    postData.append('question_type_id', question_type_id);
    return this.http.post(
      environment.BaseUrl + 'Question_types',
      postData,
      this.httpOptions
    );
  }

  McqList(chapter_id, subject_id, level_id) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    postData.append('subject_id', subject_id);
    postData.append('level_id', level_id);
    return this.http.post(
      environment.BaseUrl + 'chapters/level_wise_question',
      postData,
      this.httpOptions
    );
  }
  EnotesList(chapter_id) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    return this.http.post(
      environment.BaseUrl + 'chapters/enotes',
      postData,
      this.httpOptions
    );
  }
  VideoList(chapter_id, page_no) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    return this.http.post(
      environment.BaseUrl +
        'chapters/videos?page_no=' +
        page_no +
        '&per_page_limit=15',
      postData,
      this.httpOptions
    );
  }

  QrScan(link) {
    let postData = new FormData();
    postData.append('link', link);
    return this.http.post(
      environment.BaseUrl + 'qr-scan',
      postData,
      this.httpOptions
    );
  }
  paperview(chapter_id) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    return this.http.post(
      environment.BaseUrl + 'chapters/paper_print',
      postData,
      this.httpOptions
    );
  }
  videocount(video_id) {
    let postData = new FormData();
    postData.append('video_id', video_id);
    return this.http.post(
      environment.BaseUrl + 'subscribe/video_view',
      postData,
      this.httpOptions
    );
  }
  mindmap(chapter_id) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    return this.http.post(
      environment.BaseUrl + 'chapters/mind_mapping',
      postData,
      this.httpOptions
    );
  }
  TermsAndCondition() {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'lists/terms_and_condition',
      this.httpOptions
    );
  }
  boardpaper() {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'board-paper', this.httpOptions);
  }
  ActivationList() {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'subscribe/activated-key-list',
      this.httpOptions
    );
  }
  ProfileUpdate(postData) {
    this.setHeaderData();
    return this.http.post(
      environment.BaseUrl + 'auth/profile_update',
      postData,
      this.httpOptions
    );
  }
  DeactiveAcount(postData) {
    this.setHeaderData();
    return this.http.post(
      environment.BaseUrl + 'auth/account_deactivate',
      postData,
      this.httpOptions
    );
  }
  SubmitTest(data) {
    //console.log("Submit Data >>",data)
    return this.http.post(
      environment.BaseUrl + 'mcq_test/saveMcqTest',
      data,
      this.httpOptions
    );
  }
  GetTestReport(postData) {
    return this.http.post(
      environment.BaseUrl + 'mcq_test/get_cct_reports',
      postData,
      this.httpOptions
    );
  }
  GetTestSummary(test_id) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('test_id', test_id);
    return this.http.post(
      environment.BaseUrl + 'mcq_test/get_cct_summary',
      postData,
      this.httpOptions
    );
  }
  PreviousYearPaper(subject_id) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'lists/previous-board-paper-list',
      postData,
      this.httpOptions
    );
  }
  getProfileData(): any {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'auth/profile',
      this.httpOptions
    );
  }
  getSubjectdataList(): any {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'subject-wise-list',
      this.httpOptions
    );
  }
  sureshotQue(subject_id, ch_id) {
    let postData = new FormData();
    postData.append('chapter_id', subject_id);
    postData.append('subject_id', ch_id);
    return this.http.post(
      environment.BaseUrl + 'sure-shot/get_imp_questions',
      postData,
      this.httpOptions
    );
  }
  sureshot(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'sure-shot',
      postData,
      this.httpOptions
    );
  }
  mcqtesthistory(page_no): any {
    //console.log("page no >>",page_no)
    return this.http.get(
      environment.BaseUrl + 'mcq-test-history?page_no=' + page_no,
      this.httpOptions
    );
  }
  subjectivehistory(): any {
    return this.http.get(
      environment.BaseUrl + 'subjective-test-history',
      this.httpOptions
    );
  }
  qrscanhistory(): any {
    return this.http.get(
      environment.BaseUrl + 'qr-scan-history',
      this.httpOptions
    );
  }
  videohistory(): any {
    return this.http.get(
      environment.BaseUrl + 'videos-history',
      this.httpOptions
    );
  }
  BoardqueList(chapter_id) {
    let postData = new FormData();
    postData.append('chapter_id', chapter_id);
    return this.http.post(
      environment.BaseUrl + 'chapter-board-question-list',
      postData,
      this.httpOptions
    );
  }
  // new JASP api
  dashboardSubject(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'Subjective_lists',
      postData,
      this.httpOptions
    );
  }
  dashpaper_print(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'subjective-lists/paper_print',
      postData,
      this.httpOptions
    );
  }
  subjectvideo(subject_id) {
    let postData = new FormData();
    postData.append('chapter_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'subjective-lists/videos',
      postData,
      this.httpOptions
    );
  }
  answerBooklist(subject_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    return this.http.post(
      environment.BaseUrl + 'subjective-lists/question-answer-paper-list',
      postData,
      this.httpOptions
    );
  }
  promocode(promo_code) {
    let postData = new FormData();
    postData.append('promo_code', promo_code);
    return this.http.post(
      environment.BaseUrl + 'promo_code',
      postData,
      this.httpOptions
    );
  }
  subjectMcqList(subject_id, level_id) {
    let postData = new FormData();
    postData.append('subject_id', subject_id);
    postData.append('level_id', level_id);
    return this.http.post(
      environment.BaseUrl + 'subjective-lists/level_wise_question',
      postData,
      this.httpOptions
    );
  }
  payment(payment_id, subject_id, amount, promo_code) {
    let postData = new FormData();
    postData.append('payment_id', payment_id);
    postData.append('standard_id', subject_id);
    postData.append('amount', amount);
    postData.append('promo_code', promo_code);
    return this.http.post(
      environment.BaseUrl + 'payment',
      postData,
      this.httpOptions
    );
  }
  prelimpaper(): any {
    return this.http.get(
      environment.BaseUrl + 'prelim-paper',
      this.httpOptions
    );
  }
  checkStudent() {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'vizn_connect/check_student',
      this.httpOptions
    );
  }
  ViznStudentActivationKey(key) {
    let postData = new FormData();
    postData.append('code', key);
    return this.http.post(
      environment.BaseUrl + 'vizn_connect/connect_student_with_code',
      postData,
      this.httpOptions
    );
  }
  examListApi() {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'vizn_connect/get_mcq_test',
      this.httpOptions
    );
  }
  ViznMcqList(id) {
    let postData = new FormData();
    postData.append('paper_id', id);
    return this.http.post(
      environment.BaseUrl + 'vizn_connect/get_mcq_detail',
      postData,
      this.httpOptions
    );
  }
  viznSubmitTestapi(data) {
    //console.log("Submit Data >>",data)
    return this.http.post(
      environment.BaseUrl + 'vizn_connect/save_mcq_test',
      data,
      this.httpOptions
    );
  }
  viznGetTestReportapi(postData) {
    return this.http.post(
      environment.BaseUrl + 'vizn_connect/get_mcq_reports',
      postData,
      this.httpOptions
    );
  }
  viznGetTestSummaryapi(test_id) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('test_id', test_id);
    return this.http.post(
      environment.BaseUrl + 'vizn_connect/get_mcq_summary',
      postData,
      this.httpOptions
    );
  }
  postMethod(url, param) {
    // console.log(this.remember_token);
    //console.log(url);
    //console.log(param);
    if (url == 'customer/login?token=true') {
      let httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Accept: 'application/json',
          // Authorization: 'application/json',
          Authorization: 'Bearer ' + this.remember_token,
        }),
      };

      // return this.http.post<any>(this.domainUrl + url, param, httpOption).pipe(
      //   tap((param) => console.log('success')),
      //   catchError(this.handleError1)
      //   // catchError(this.handleError<any>(url,[])),
      // );
    } else {
      let httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Accept: 'application/json',
          // Authorization: 'application/json',
          Authorization: 'Bearer ' + this.remember_token,
        }),
      };
      // return this.http.post<any>(this.domainUrl + url, param, httpOption).pipe(
      //   tap((param) => console.log('success')),
      //   catchError(this.handleError1)
      //   // catchError(this.handleError<any>(url))
      // );
    }
  }

  getStandardData(): any {
    this.setHeaderData();
    return this.http.get(
      environment.BaseUrl + 'Switch_standard',
      this.httpOptions
    );
  }
  setStandardData(subId): any {
    this.setHeaderData();
    let postData = new FormData();
    postData.append('StudentTypeID', subId);
    return this.http.post(
      environment.BaseUrl + 'switch_standard/switch_standard',
      postData,
      this.httpOptions
    );
  }
  // GET & SET USER DATA

  setUserData(userData, login_token) {
    //console.log(userData)
    window.localStorage.setItem('user_data', JSON.stringify(userData));
    // window.localStorage.setItem('device_id', this.device_id);
    if (login_token != '')
      window.localStorage.setItem('login_token', login_token);
    window.localStorage.setItem('user_id', userData.VStudentID);
  }

  getUserData() {
    if (window.localStorage['user_data']) {
      return JSON.parse(window.localStorage['user_data']);
    }
    return;
  }

  getUserId() {
    if (window.localStorage['user_id']) {
      return window.localStorage['user_id'];
    }
    return;
  }

  getLoginToken() {
    if (localStorage.getItem('login_token')) {
      return localStorage.getItem('login_token');
    }
    return '';
  }

  // GET & SET DEVICE INFO

  setDeviceInfo(deviceInfo) {
    window.localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
  }

  getDeviceInfo() {
    if (window.localStorage['deviceInfo']) {
      return JSON.parse(window.localStorage['deviceInfo']);
    }
    return;
  }

  // callOneSignal() {
  //   this.oneSignal.startInit('9b0e84fb-5e5c-42dc-8582-84ef7c9e4c52','546015657170');

  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

  //   this.oneSignal.handleNotificationReceived().subscribe(() => {
  //     // do something when notification is received
  //    });

  //    this.oneSignal.handleNotificationOpened().subscribe(() => {
  //      // do something when a notification is opened
  //    });

  //   this.oneSignal.endInit();
  //   this.oneSignal.getIds().then((id) => {
  //     //console.log('userId login ==> ',id.userId);
  //     //console.log('pushToken ==> ',id.pushToken);
  //     localStorage.setItem('PlearID',id.userId);
  //   });
  // }
}
