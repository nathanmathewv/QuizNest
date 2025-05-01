import { Component } from '@angular/core';
import { SharedModule } from '../../../module/shared/shared.module';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {
  categories: any[] = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };
categoryControl: any;

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data: any) => {
        //categories load
        this.categories = data;
        // console.log(this.categories);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error!!', 'error in loading data from server', 'error');
      }
    });
  }
  //
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    //validation...

    //call server
    this._quiz.addQuiz(this.quizData).subscribe({
      next: (data) => {
        Swal.fire('Success', 'quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },
      error: (error) => {
        Swal.fire('Error!! ', 'Error while adding quiz', 'error');
        console.log(error);
        console.log(this.quizData);
      }
    });
  }
}

