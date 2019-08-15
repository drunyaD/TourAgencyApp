import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import { LoginComponent }   from './login/login.component';
import { RegistrationComponent }   from './registration/registration.component';
import {NavBarComponent} from './navBar/navBar.component';
import {Routes, RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ToursComponent} from './tours/tours.component';
import {TourCreationComponent} from './tourCreation/tourCreation.component';
import {AccountComponent} from './account/account.component';
import {DetailsComponent} from './details/details.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
	{ path:'tours', component: ToursComponent},
	{ path:'tours/:id', component: DetailsComponent},
	{ path :'account', component: AccountComponent},
	{ path :'tourCreation', component: TourCreationComponent},
	{ path : '', redirectTo: 'login', pathMatch:'full'}
];
 
 
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent, LoginComponent, NavBarComponent, RegistrationComponent,
					AccountComponent, ToursComponent , DetailsComponent, TourCreationComponent
				   ],
	providers:	  [ CookieService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }