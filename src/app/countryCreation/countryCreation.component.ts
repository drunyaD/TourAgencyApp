import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { TourService} from '../tour.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Country } from '../models/Country';
import { City } from '../models/city';
   
@Component({
    selector: 'countryCreation',
    templateUrl:'./countryCreation.component.html',
	styleUrls: ['./countryCreation.component.css'],
    providers: [UserService, TourService]
})
export class CountryCreationComponent { 
    country:Country = new Country();
    constructor(private tourService:TourService,
                private router: Router){
        if (sessionStorage.getItem('currentUserRole') !== 'administrator' && 
            sessionStorage.getItem('currentUserRole') !== 'moderator')
                    this.router.navigate(['/login']);
    }
    submit(){
        this.tourService.createCountry(this.country).subscribe((res: Response) => {
            console.log(res);
            this.router.navigate(['/tours']);
            },
        error => alert(error.error));
    }

	ngOnInit(){
    }
    
}