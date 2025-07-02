import {Component, OnInit, signal} from '@angular/core';
import {ExamDto, ExamStatus} from '../../shared/dto/exam.dto';
import {ExamApi} from '../../shared/services/exam-api';
import {take} from 'rxjs';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-exam',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './exam.html',
  standalone: true,
  styleUrl: './exam.scss'
})
export class Exam implements OnInit {

  readonly examStatus: typeof ExamStatus = ExamStatus;

  examsList = signal<ExamDto[]>([]);

  constructor(private examApi: ExamApi) {
  }

  ngOnInit(): void {

    this.loadExams();
  }

  private loadExams() {
    this.examApi.getExams()
      .pipe(take(1)).subscribe({
      next: (value: ExamDto[]) => {
        this.examsList.set(value);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
