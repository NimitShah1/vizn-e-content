import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subjects/subjects.module').then((m) => m.SubjectsPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'selsubject',
    loadChildren: () =>
      import('./selsubject/selsubject.module').then(
        (m) => m.SelsubjectPageModule
      ),
  },
  {
    path: 'subvideolist',
    loadChildren: () =>
      import('./subvideolist/subvideolist.module').then(
        (m) => m.SubvideolistPageModule
      ),
  },
  {
    path: 'video',
    loadChildren: () =>
      import('./video/video.module').then((m) => m.VideoPageModule),
  },
  {
    path: 'linkdevice',
    loadChildren: () =>
      import('./linkdevice/linkdevice.module').then(
        (m) => m.LinkdevicePageModule
      ),
  },
  {
    path: 'activekey',
    loadChildren: () =>
      import('./activekey/activekey.module').then((m) => m.ActivekeyPageModule),
  },
  {
    path: 'switchprofile',
    loadChildren: () => import('./switchprofile/switchprofile.module').then( m => m.SwitchprofilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
