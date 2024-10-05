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
import { UpdateSpotsComponent } from './components/update-spots/update-spots.component';
import { UpdateProductsComponent } from './components/update-products/update-products.component';
import { MyLocalsComponent } from './components/my-locals/my-locals.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LocalComponent
  },
  {
    path: 'include',
    component: IncludeComponent
  },
  {
    path: 'product',
    component: HomeComponent
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
  },
  {
    path: 'read-my-spots',
    component: MyLocalsComponent
  },
  {
    path: 'update-spots/:id',
    component: UpdateSpotsComponent
  },
  {
    path: 'read-my-products',
    component: MyProductsComponent
  },
  {
    path: 'update-products/:id',
    component: UpdateProductsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
