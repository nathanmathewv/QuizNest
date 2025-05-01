import { Component } from '@angular/core';
import { SharedModule } from '../../../module/shared/shared.module';
import { AppSidebarUserComponent } from '../app-sidebar-user/app-sidebar-user.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [SharedModule, AppSidebarUserComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
