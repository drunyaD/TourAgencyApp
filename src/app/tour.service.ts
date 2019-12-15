import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginModel} from './models/loginModel';
import {RegisterModel} from './models/registerModel';
import {City} from './models/city';
import {Country} from './models/country';
import {Tour} from './models/tour';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {TourSearchModel} from './models/TourSearchModel';
import {PagingModel	} from './models/PagingModel';
import { FormGroup } from '@angular/forms';

@Injectable()
export class TourService{
	
	constructor(private http: HttpClient, private cookieService:CookieService){ }
	
	baseUrl : string = "https://localhost:44349/api/";
	
	getOptions() {
		const headers = new HttpHeaders()
		.set("Content-Type", "application/json");
		return {headers:headers, withCredentials:true};
	}

	getFormDataOptions() {
		const headers = new HttpHeaders()
		.set("Content-Type", "multipart/form-data");
		return {headers:headers, withCredentials:true};
	}
	
	getCities() : Observable<City[]> {
		return this.http.get<City[]>(this.baseUrl + 'cities');	
	}
	getCity(id:number) {
		return this.http.get(this.baseUrl + 'cities/' + id);
	}
	createCity(city:City) {
		return this.http.post( this.baseUrl + 'cities', city, this.getOptions());
	}
	editCity(city:City) {
		return this.http.put(this.baseUrl + 'cities', city, this.getOptions());
	}
	deleteCity(id:number) {
		return this.http.delete( this.baseUrl + 'cities/' + id, this.getOptions());
	}
	
	getCountries(): Observable<Country[]> {
		return this.http.get<Country[]>(this.baseUrl + 'countries');
	}
	getCountry(id:number) {
		return this.http.get(this.baseUrl + 'countries/' + id);
	}
	createCountry(country:Country) {

		return this.http.post(this.baseUrl + 'countries', country, this.getOptions());
	}
	
	deleteCountry(id:number) {
		return this.http.delete(this.baseUrl + 'countries/' + id, this.getOptions());
	}
	
	
	getTours(searchModel: TourSearchModel, pagingModel: PagingModel) {
		
		let search = {};
		for (let key in searchModel) {
			if (searchModel[key] !== undefined)
				search[key] = searchModel[key].toString();
		}
		
		let paging = {
			pageSize: pagingModel.pageSize.toString(),
			pageNumber : pagingModel.pageNumber.toString()		
		}
	return this.http.get<Tour[]>(this.baseUrl + 'tours', {observe:'response', params: {...search, ...paging}});
	}

	getToursByUserName(userName: string) : Observable<Tour[]>{
		return this.http.get<Tour[]>(this.baseUrl + 'tours', 
		{params: {userName: userName}, withCredentials:true});
	}
	getTour(id:number) {
		return this.http.get<Tour>(this.baseUrl + 'tours/' + id);
	}
	
	createTour(tourForm:FormGroup, tourModel:Tour) {
		const formData = new FormData();
		formData.append('tourJson', JSON.stringify(tourModel));
		let images = tourForm.get('images').value;
		//console.log(images);
		for (let i=0; i< images.length; i++) {
			formData.append('image'+ i, images[i]);
		}
		return this.http.post(this.baseUrl + 'tours', formData, {withCredentials:true});
	}
	
	editTour(tour:Tour) {
		return this.http.put(this.baseUrl + 'tours', tour, this.getOptions());
	}
     
	deleteTour(id:number) {
		return this.http.delete(this.baseUrl + 'tours/' + id, this.getOptions());
	}
	addUserToTour(id:number) {
		return this.http.post(this.baseUrl + 'tours/' + id +'/users', null, 
		{withCredentials:true});
	}
	deleteUserFromTour(id:number) {
		return this.http.delete(this.baseUrl + 'tours/' + id +'/users', 
		{withCredentials:true});
	}

}