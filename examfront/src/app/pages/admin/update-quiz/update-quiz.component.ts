
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { SharedModule } from '../../../module/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
  imports: [SharedModule]
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router
  ) {}

  qId = 0;
  quiz: any;
  categories: any[] = [];

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        alert('error in loading categories');
      }
    );
  }

  //update form submit
  public updateData() {
    //validatate

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Success', 'Quiz updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'error in updating quiz', 'error');
        console.log(error);
      }
    );
  }

  public displayCategory(categoryId: any): string {
    if (!categoryId || !this.categories) {
      return '';
    }
    const category = this.categories.find(c => c.cid === categoryId);
    return category ? category.title : '';
  }
  
}
