import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { TourService} from '../tour.service';
import {LoginModel} from '../models/loginModel';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {User} from '../models/user';
import { Tour } from '../models/tour';
import { City } from '../models/city';
import { FormGroup, FormBuilder } from '@angular/forms';
   
@Component({
    selector: 'tourCreation',
    templateUrl:'./tourCreation.component.html',
	styleUrls: ['./tourCreation.component.css'],
    providers: [UserService, TourService]
})
export class TourCreationComponent { 
    tour:Tour = new Tour();
    cities:City[]=[];
    imageTitle: string;
    imageSrc: string;
    uploadForm: FormGroup;

    constructor(private cookieService : CookieService, 
                private tourService:TourService,
                private router: Router,
                private formBuilder: FormBuilder){
        if (sessionStorage.getItem('currentUserRole') !== 'administrator' && 
            sessionStorage.getItem('currentUserRole') !== 'moderator')
                    this.router.navigate(['/login']);
    }
    submit(){
        this.tourService.createTour(this.uploadForm, this.tour).subscribe((res: Response) => {
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
        this.uploadForm = this.formBuilder.group({
            name: '',
            description: '',
            price: 0,
            startDate: '',
	        finishDate:'',
	        maxCapacity:0,
            images: [][''],
            cities:[],
          });
      
        this.tour.cities=[];
        this.tour.images = [];
        this.tourService.getCities().subscribe((data) => this.cities = data);
    }
    onFileChange(event:any){
        for (let file of event.target.files){
            const image = new Image();
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageSrc = e.target.result;
                image.src = e.target.result;
        }
      reader.readAsDataURL(file);
      this.imageTitle = file.name;
      this.uploadForm.get('images').setValue(event.target.files);
      console.log(this.uploadForm.get('images').value);
    }
    }

    
}