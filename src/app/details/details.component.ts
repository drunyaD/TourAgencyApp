import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Tour } from '../models/tour';
import {TourService} from '../tour.service';
import {UserService} from '../user.service';
import { formatDate } from "@angular/common";
import {User} from '../models/user';
   
@Component({
    selector: 'tour-details',
    templateUrl:'./details.component.html',
    styleUrls: ['./details.component.css'],
    providers: [TourService, UserService],
})
export class DetailsComponent { 
   
    tour: Tour;
    users:User[];


    entered(){
        return sessionStorage.getItem('entered');
    }
    alreadyRegistered(){
        for (let u of this.users) {
            if (u.id=== sessionStorage.getItem('currentUserId'))
            return true;
        }
        return false;
    }

    refreshPage(){
        this.tourService.getTour(this.activateRoute.snapshot.params['id'])
        .subscribe((data:Tour) => this.tour=data);
        this.userService.getUsersByTour(this.activateRoute.snapshot.params['id'])
        .subscribe((data:User[]) => this.users = data);
    }

    registerOnTour(){
        this.tourService.addUserToTour(this.tour.id).subscribe(
            (res: Response) => {
                this.refreshPage();
                },
            error => console.log(error)
        );
        
    }

    unsubscribeFromTour() {
        this.tourService.deleteUserFromTour(this.tour.id).subscribe(
            (res: Response) => {
                this.refreshPage();
                },
            error => console.log(error)
        );
        
    }

    getImage(source: number[]){
		let base64 = btoa(String.fromCharCode(null, ...source));
		let url = 'data:image/jpeg;base64,' + base64; // use this in <img src="..."> binding
		return url;
	}
	dateFormat(date: Date) {
		return formatDate(date, 'dd/MM/yyyy HH:mm:ss','ru');
	}
    constructor(private activateRoute: ActivatedRoute, 
                private tourService: TourService,
                 private userService : UserService,
                 private router: Router) {
            this.refreshPage();
    }

    canDelete(){
        return (sessionStorage.getItem('currentUserRole') === 'moderator' 
            ||  sessionStorage.getItem('currentUserRole') === 'administrator')
    }

    deleteTour() {
        this.tourService.deleteTour(this.tour.id).subscribe((res) => {
            this.router.navigate(['/tours']); 
        }, (err) => console.log(err))
    }

	ngOnInit(){
        
	}
}