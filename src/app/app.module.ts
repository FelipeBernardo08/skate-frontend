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
    IncludeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
