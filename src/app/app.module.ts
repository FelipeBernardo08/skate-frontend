import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './template/nav-bar/nav-bar.component';
import { HeaderBarComponent } from './template/header-bar/header-bar.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { CreateSkaterComponent } from './components/create-skater/create-skater.component';
import { LocalComponent } from './components/local/local.component';
import { IncludeComponent } from './components/include/include.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateLocalComponent } from './components/create-local/create-local.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialgoCommentsComponent } from './components/dialgo-comments/dialgo-comments.component';
import { MatSelectModule } from '@angular/material/select';
import { DialgoInfoComponent } from './components/dialgo-info/dialgo-info.component';
import { UpdateSpotsComponent } from './components/update-spots/update-spots.component';
import { UpdateProductsComponent } from './components/update-products/update-products.component';
import { MyLocalsComponent } from './components/my-locals/my-locals.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderBarComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    CreateSkaterComponent,
    LocalComponent,
    IncludeComponent,
    CreateLocalComponent,
    CreateProductComponent,
    DialgoCommentsComponent,
    DialgoInfoComponent,
    UpdateSpotsComponent,
    UpdateProductsComponent,
    MyLocalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
