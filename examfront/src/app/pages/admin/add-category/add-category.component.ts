import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { SharedModule } from '../../../module/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  imports: [SharedModule],
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    // Validate title field
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // Add category and handle the response using new subscribe syntax
    this._category.addCategory(this.category).subscribe({
      next: (data: any) => {
        this._snack.open('Category added successfully', '', {
          duration: 1000,
        });

        // Navigate to 'view-categories' page after showing success message
        setTimeout(() => {
          this._router.navigate(['/admin/categories']);
        }, 1000); // Wait for 3 seconds to display the snack bar
      },
      error: (error) => {
        console.error(error);
        this._snack.open('Server error', '', {
          duration: 3000,
        });
      },
      complete: () => {
        console.log('Category addition process completed.');
      },
    });
  }
}
