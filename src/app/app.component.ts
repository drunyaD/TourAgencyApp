import { Component, OnInit } from '@angular/core';
     
 
@Component({
    selector: 'purchase-app',
    templateUrl:'./app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent { 
  
  ngOnInit(){
    sessionStorage.setItem('entered','no');
    sessionStorage.removeItem('currentUserName');
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('currentUserRole');
  }

}