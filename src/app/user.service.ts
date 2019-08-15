import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginModel} from './models/loginModel';
import {RegisterModel} from './models/registerModel';
import {CookieService} from 'ngx-cookie-service';
import {User} from './models/user';

@Injectable()
export class UserService{
	
	baseUrl : string = "https://localhost:44349/api/";
	constructor(private http: HttpClient, private cookieService: CookieService){ }
	
      
    login(loginModel : LoginModel) {	
		const headers = new HttpHeaders({"Content-Type": "application/json"});
		  return this.http.post<User>(this.baseUrl +  'authentication', loginModel, 
		  {headers:headers, withCredentials: true, observe: "response"});
        
    }
	logout(){
		localStorage.clear();
		return this.http.delete(this.baseUrl + 'authentication');
		
	}
    register(registerModel: RegisterModel){
		const headers = new HttpHeaders()
		.set("Content-Type", "application/json");
        return this.http.post(this.baseUrl +  'users', registerModel, {headers:headers});
        
	}
	
	getUsersByTour(id:number) {
		return this.http.get<User[]>(this.baseUrl + 'users?tourId='+id);
	}

	getUser(id:string) {
		return this.http.get<User>(this.baseUrl + 'users/' + id, {withCredentials:true});
	}
}