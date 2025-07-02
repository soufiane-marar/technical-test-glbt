import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExamDto} from '../dto/exam.dto';

@Injectable({
  providedIn: 'root'
})
export class ExamApi {

  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getExams(): Observable<ExamDto[]> {
    return this.http.get<ExamDto[]>(`${this.baseUrl}/api/exams`);
  }

  postExam(examDto: ExamDto): Observable<ExamDto> {
    return this.http.post<ExamDto>(`${this.baseUrl}/api/exams`, examDto);
  }
}
