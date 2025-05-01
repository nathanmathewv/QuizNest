import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../module/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack:MatSnackBar, private login: LoginService, private router: Router) {}

  ngOnInit() {}

  formSubmit() {
    console.log(this.loginData);
    
    if(this.loginData.username.trim()==''||this.loginData.username ==null){
      this.snack.open('Username is required','',{
        duration:3000
      });
      return;
    }

    if(this.loginData.password.trim()==''||this.loginData.password ==null){
      this.snack.open('Password is required','',{
        duration:3000
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);

        //login
        this.login.loginUser(data.token);

        //get current user
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log("User Data");
            console.log(this.login.getUser());

            //redirect...ADMIN:admin, USER:user
            if(this.login.getUserRole()=='ADMIN'){
              //admin dashboard
              // window.location.href='/admin';
              this.router.navigate(['/admin']);
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=='NORMAL'){
              //user dashboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['/user-dashboard']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
            }
          }
        );
      },
      (error)=>{
        console.log("Error");
        console.log(error);
        this.snack.open('Invalid details, try again','',{
          duration:3000
        });
      }
    );

  }

}
