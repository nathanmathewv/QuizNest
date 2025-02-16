
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { SharedModule } from '../../../module/shared/shared.module';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
  imports: [SharedModule],
  standalone: true,
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any[] = [
  //   {
  //     qId: 1,
  //     title: 'Quiz 1',
  //     description: 'This is quiz 1',
  //     maxMarks: 10,
  //     numberOfQuestions: 5,
  //     active: true,
  //   },
  //   {
  //     qId: 2,
  //     title: 'Quiz 2',
  //     description: 'This is quiz 2',
  //     maxMarks: 10,
  //     numberOfQuestions: 5,
  //     active: true,
  //   },
  //   {
  //     qId: 3,
  //     title: 'Quiz 3',
  //     description: 'This is quiz 3',
  //     maxMarks: 10,
  //     numberOfQuestions: 5,
  //     active: true,
  //   },
  //   {
  //     qId: 4,
  //     title: 'Quiz 4',
  //     description: 'This is quiz 4',
  //     maxMarks: 10,
  //     numberOfQuestions: 5,
  //     active: true
  //   }
     ];
  router: any;
  constructor(private _quiz: QuizService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    console.log(this.quizzes);
    this._quiz.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      error: (error: any) => {
        console.log(error);
        this.snack.open('Error in loading quizzes', '', {
          duration: 3000,
        });
      }
    });
  }

  //
  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        //delete...
        this._quiz.deleteQuiz(qId).subscribe({
              next: (data: any) => {
              this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
              // Swal.fire('Success', 'Quiz deleted ', 'success');
              // this.router.navigate(['/admin/quizzes']);
              window.location.reload();
              },
              error: (error: any) => {
              Swal.fire('Error', 'Error in deleting quiz', 'error');
              }
            }); }
    });
  }
}
