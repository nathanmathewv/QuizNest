import { Component } from '@angular/core';
import { SharedModule } from '../../../module/shared/shared.module';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
