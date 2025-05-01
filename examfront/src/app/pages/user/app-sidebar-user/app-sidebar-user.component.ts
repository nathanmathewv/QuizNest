import { Component } from '@angular/core';
import { SharedModule } from '../../../module/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-sidebar-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app-sidebar-user.component.html',
  styleUrl: './app-sidebar-user.component.css'
})
export class AppSidebarUserComponent {
  categories: any[] = [];

  constructor(private _cat: CategoryService, private _snack: MatSnackBar) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );
  }

}
