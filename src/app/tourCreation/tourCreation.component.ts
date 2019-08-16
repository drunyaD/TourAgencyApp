import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { TourService} from '../tour.service';
import {LoginModel} from '../models/loginModel';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {User} from '../models/user';
import { Tour } from '../models/tour';
import { City } from '../models/city';
   
@Component({
    selector: 'tourCreation',
    templateUrl:'./tourCreation.component.html',
	styleUrls: ['./tourCreation.component.css'],
    providers: [UserService, TourService]
})
export class TourCreationComponent { 
    tour:Tour = new Tour();
    cities:City[]=[];
    constructor(private cookieService : CookieService, 
                private tourService:TourService,
                private router: Router){
        if (sessionStorage.getItem('currentUserRole') !== 'administrator' && 
            sessionStorage.getItem('currentUserRole') !== 'moderator')
                    this.router.navigate(['/login']);
    }
    submit(){
        this.tourService.createTour(this.tour).subscribe((res: Response) => {
            console.log(res);
            this.router.navigate(['/tours']);
            },
        error => alert(error.error));
    }
    addCity(){
        let city = new City();
        city.id = 0;
        city.name = 'name';
        city.countryName = 'name';
        this.tour.cities.push(city);
    }
    removeCity(){
        this.tour.cities.pop();
    }

	ngOnInit(){
        this.tour.cities=[];
        this.tour.images = [];
        this.tourService.getCities().subscribe((data) => this.cities = data);
    }
    onFileChange(event:any){
        for (let i of event.target.files){
        let me = this;
        var reader = new FileReader();
        reader.onload = function(){
            var arrayBuffer = this.result;
            let uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
            let array = Array.from(uint8Array);
            me.tour.images.push(array);
        }
        reader.readAsArrayBuffer(i);
    }
    }

    
}