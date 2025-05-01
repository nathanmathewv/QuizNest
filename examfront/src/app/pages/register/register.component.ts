import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { SharedModule } from '../../module/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private UserService : UserService, private snack: MatSnackBar) { }
  ngOnInit(): void {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    number: ''
  }

  formSubmit() {
    if(this.user.username == '' || this.user.username == null) {
      this.snack.open("Username cannot be empty", "", {duration: 3000, verticalPosition: 'top'});
      return;
    }
    if(this.user.password == '' || this.user.password == null) {
      this.snack.open("Password cannot be empty", "", {duration: 3000, verticalPosition: 'top'});
      return;
    }
    if(this.user.firstName == '' || this.user.firstName == null) {
      this.snack.open("First name cannot be empty", "", {duration: 3000, verticalPosition: 'top'});
      return;
    }
    if(this.user.lastName == '' || this.user.lastName == null) {
      this.snack.open("Last name cannot be empty", "", {duration: 3000, verticalPosition: 'top'});
      return;
    }
    if(this.user.email == '' || this.user.email == null) {
      this.snack.open("Email cannot be empty", "", {duration: 3000, verticalPosition: 'top'});
      return;
    }
    if(this.user.number == '' || this.user.number == null) {
      this.snack.open("Phone number cannot be empty", "", {duration: 3000, verticalPosition: 'top'});
      return;
    }
    this.UserService.addUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.snack.open("User has been registered","", {duration: 3000, verticalPosition: 'top'});
      },
      error: (error) => {
        console.log(error);
      
        // Extract the error message dynamically
        let errorMessage = 'Something went wrong'; // Default message
        if (error.error) {
          if (typeof error.error === 'string') {
            // Backend responded with a plain text message
            errorMessage = error.error;
          } else if (error.error.message) {
            // Backend responded with a JSON object containing a `message` field
            errorMessage = error.error.message;
          }
        }
      
        // Display the error message in the snack bar
        this.snack.open(errorMessage, "OK", { verticalPosition: 'top' });
      },
      complete: () => {
        console.log("Request completed");
      },
    });
  }
}
