import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IncludeComponent } from './components/include/include.component';
import { LocalComponent } from './components/local/local.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateSkaterComponent } from './components/create-skater/create-skater.component';
import { LoginComponent } from './components/login/login.component';
import { CreateLocalComponent } from './components/create-local/create-local.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

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
  },
  {
    path: 'create-local',
    component: CreateLocalComponent
  },
  {
    path: 'create-product',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
