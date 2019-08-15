import { Component, OnInit} from '@angular/core';
import {TourService} from '../tour.service';
import {Tour} from '../models/tour';
import {Country} from '../models/country';
import {TourSearchModel} from '../models/TourSearchModel';
import {SortState} from '../models/SortStates';
import {PagingModel} from '../models/PagingModel';
import { formatDate } from "@angular/common";
import {Router} from '@angular/router';

@Component({
    selector: 'tours',
    templateUrl:'./tours.component.html',
	styleUrls: ['./tours.component.css'],
	providers: [TourService],
})
export class ToursComponent { 
    SortState:any = SortState;
	tours: Tour[]=[];
	countries: Country[]=[];
	searchModel: TourSearchModel = {notFullOnly :true};	
	pagingModel: PagingModel = new PagingModel();
	pagingMetadata:{}={};
	
	
	constructor(private tourService: TourService, private router: Router){}
	
	numberArray(){
		return Array.from(new Array(this.pagingMetadata['totalPages']), (x,i) => i+1)
	}

	showDetails(tourId: number){
		this.router.navigate(['/tours/' + tourId]); 
	}

	getImage(source: number[]){
		let base64 = btoa(String.fromCharCode(null, ...source));
		let url = 'data:image/jpeg;base64,' + base64; // use this in <img src="..."> binding
		return url;
	}
	dateFormat(date: Date) {
		return formatDate(date, 'dd-MM-yyyy','ru');
	}
	ngOnInit(){
		this.tourService.getCountries().subscribe(data =>this.countries= data);
		this.search();
	}
	search() {

		this.tourService.getTours(this.searchModel, this.pagingModel)
		.subscribe((res) => 
			{
				this.tours=res.body;
				this.pagingMetadata = JSON.parse(res.headers.get('paging-headers'));
			});
	}
	
	goToPage(pageNum:number){
		if (pageNum <= this.pagingMetadata['totalPages'] && pageNum >= 1) { 
		this.pagingModel.pageNumber = pageNum;
		this.search();
		}
	}
}