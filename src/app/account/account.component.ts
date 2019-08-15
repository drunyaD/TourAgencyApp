import { Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Tour} from '../models/tour';
import {UserService} from '../user.service';
import {TourService} from '../tour.service';
import { City } from '../models/city';
import { Router } from '@angular/router';
   
@Component({
    selector: 'account',
    templateUrl:'./account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [TourService, UserService]
})
export class AccountComponent { 
   
    user: User;
    userTours: Tour[];
    userCity: City;
      
    constructor(private tourService: TourService,
        private userService : UserService, private router:Router){
            if (sessionStorage.getItem('entered') === 'no')
            router.navigate(['/login']);
        }

	ngOnInit(){
       this.userService.getUser(sessionStorage.getItem('currentUserId')).subscribe(
        (data:User) => {
            this.user = data;
            if (this.user.cityId != null)
            this.tourService.getCity(this.user.cityId).subscribe((city:City) => this.userCity = city);
            },
        error => console.log(error)
        );

        this.tourService.getToursByUserName(sessionStorage.getItem('currentUserName')).subscribe(
            (data:Tour[]) => {
                this.userTours = data;
                },
            error => console.log(error)
        );

        
	}
}