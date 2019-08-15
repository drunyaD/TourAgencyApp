import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import {LoginModel} from '../models/loginModel';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {User} from '../models/user';
   
@Component({
    selector: 'login',
    templateUrl:'./login.component.html',
	styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent { 
   
    loginModel: LoginModel=new LoginModel(); 
      
    constructor(private userService: UserService,  private router: Router, private cookieService : CookieService){}
    submit(){
        this.userService.login(this.loginModel).subscribe(
                    (res) => {
                        sessionStorage.setItem('entered', 'yes');
                        sessionStorage.setItem('currentUserId', res.body.id);
                        sessionStorage.setItem('currentUserName', res.body.userName);
                        sessionStorage.setItem('currentUserRole',res.body.role);
                        this.router.navigate(['/tours']); 
						},
                    err => {
                         alert(err.error);
                    }
                );
             
    }
	ngOnInit(){
        sessionStorage.setItem('entered', 'no');
        sessionStorage.removeItem('currentUserName');
        sessionStorage.removeItem('currentUserId');
        sessionStorage.removeItem('currentUserRole');
		this.userService.logout();
	}
}