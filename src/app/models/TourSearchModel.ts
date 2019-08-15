import {SortState} from './SortStates';

export class TourSearchModel{
	sortState? :SortState;
	notFullOnly?:boolean;
	minPrice?:number;
	maxPrice?:number;
	minTime?:Date;
	maxTime?:Date;
	countryId?: number;
	searchString?:string;
	
}