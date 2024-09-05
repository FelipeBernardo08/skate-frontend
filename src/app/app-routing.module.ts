import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IncludeComponent } from './components/include/include.component';
import { LocalComponent } from './components/local/local.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateSkaterComponent } from './components/create-skater/create-skater.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'include',
    component: IncludeComponent
  },
  {
    path: 'local',
    component: LocalComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'create-profile',
    component: CreateSkaterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
