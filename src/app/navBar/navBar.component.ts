import { Component} from '@angular/core';
   
@Component({
    selector: 'navBar',
    templateUrl:'./navBar.component.html',
	styleUrls: ['./navBar.component.css'],
})
export class NavBarComponent { 
   
    entered() {
		return sessionStorage.getItem("entered");
    }
    
    role(){
        return sessionStorage.getItem("currentUserRole");
    }
      
    constructor(

    ){}

}