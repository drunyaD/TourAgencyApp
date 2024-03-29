import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder }   from '@angular/forms';
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
import {CityCreationComponent} from './cityCreation/cityCreation.component';
import {CountryCreationComponent} from './countryCreation/countryCreation.component';

registerLocaleData(localeRu, 'ru');

const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
	{ path:'tours', component: ToursComponent},
	{ path:'tours/:id', component: DetailsComponent},
	{ path :'account', component: AccountComponent},
	{ path :'tourCreation', component: TourCreationComponent},
	{ path : '', redirectTo: 'login', pathMatch:'full'},
	{ path : 'cityCreation', component: CityCreationComponent},
	{ path : 'countryCreation', component: CountryCreationComponent}
];
 
 
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent, LoginComponent, NavBarComponent, RegistrationComponent,
					AccountComponent, ToursComponent , DetailsComponent, TourCreationComponent,
					CityCreationComponent, CountryCreationComponent
				   ],
	providers:	  [ CookieService, FormBuilder ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }