import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { TourService} from '../tour.service';

import {RegisterModel} from '../models/registerModel';
import {City} from '../models/city';
import { Router } from '@angular/router';
   
@Component({
    selector: 'registration',
    templateUrl:'./registration.component.html',
	styleUrls: ['./registration.component.css'],
    providers: [UserService, TourService]
})
export class RegistrationComponent { 

    cities: City[]=[];
    confirmPassword:string;
    registerModel: RegisterModel=new RegisterModel(); 
      
    constructor(private tourService: TourService, private userService:UserService, private router:Router){}
	
	ngOnInit(){
          
        this.tourService.getCities().subscribe(data => this.cities=data.sort((a,b) => a.name.localeCompare(b.name)));
    }
	
    submit(){
        this.userService.register(this.registerModel).subscribe(
                    (res: Response) => {
                        console.log(res);
                        this.router.navigate(['/login']);
						},
                    err => alert(err.error)
                );
                
    }
}