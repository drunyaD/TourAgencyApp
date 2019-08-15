import {City} from './city';


export class Tour{
	id:number;
	name:string;
	description:string;
	price:number;
	startDate:Date;
	finishDate:Date;
	maxCapacity:number;
	images:number[][];
	cities:City[];
	
}