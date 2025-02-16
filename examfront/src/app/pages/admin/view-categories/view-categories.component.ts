import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../module/shared/shared.module';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'], // Corrected `styleUrl` to `styleUrls`
})
export class ViewCategoriesComponent implements OnInit {
  categories: any[] = [];
  loading = true; // Add loading state

  constructor(private _category: CategoryService, private snack: MatSnackBar) {}

  ngOnInit() {
    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);
        this.loading = false; // Data loaded
      },
      error: (error) => {
        console.log(error);
        this.snack.open('Error in loading data', '', { duration: 3000 });
        this.loading = false; // Even on error, stop loading spinner
      },
    });
  }
}
