import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { TourService} from '../tour.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Country } from '../models/Country';
import { City } from '../models/city';
   
@Component({
    selector: 'cityCreation',
    templateUrl:'./cityCreation.component.html',
	styleUrls: ['./cityCreation.component.css'],
    providers: [UserService, TourService]
})
export class CityCreationComponent { 
    city:City = new City();
    countries:Country[]=[];
    constructor(private tourService:TourService,
                private router: Router){
        if (sessionStorage.getItem('currentUserRole') !== 'administrator' && 
            sessionStorage.getItem('currentUserRole') !== 'moderator')
                    this.router.navigate(['/login']);
    }
    submit(){
        this.tourService.createCity(this.city).subscribe((res: Response) => {
            console.log(res);
            this.router.navigate(['/tours']);
            },
        error => alert(error.error));
    }

	ngOnInit(){
        this.tourService.getCountries().subscribe((data) => this.countries = data);
    }

    
    
}