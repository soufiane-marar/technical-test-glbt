import {Component, computed, Signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExamDto, ExamStatus} from '../../shared/dto/exam.dto';
import {Router} from '@angular/router';
import {ExamApi} from '../../shared/services/exam-api';
import {take} from 'rxjs';

@Component({
  selector: 'app-exam-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './exam-form.html',
  standalone: true,
  styleUrl: './exam-form.scss'
})
export class ExamForm {

  public readonly statusList: ExamStatus[] = [ExamStatus.Confirme, ExamStatus.AOrganiser, ExamStatus.Annule, ExamStatus.RechercheDePlace];

  formGroup: FormGroup;

  studentForm: Signal<FormGroup> = computed(() => {
    return this.formGroup!.controls['student'] as FormGroup;
  })

  constructor(private fb: FormBuilder, private router: Router, private examApi: ExamApi) {
    this.formGroup = fb.group({
      student: fb.group({
        'last_name': new FormControl('', [Validators.required]),
        'first_name': new FormControl('', [Validators.required]),
      }),
      'meeting_point': new FormControl(''),
      'date': new FormControl(''),
      'status': new FormControl(ExamStatus.AOrganiser),
    })
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAllAsDirty();
      return;
    }

    this.examApi.postExam(this.formGroup.value).pipe(take(1)).subscribe({
      next: (value: ExamDto) => {
        alert("Examen ajoué !");
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        console.log(error);
        alert("Erreur de serveur, veuillez ressayer plutard");
      }
    })
  }

  cancel() {
    this.formGroup.reset();
    this.router.navigateByUrl('/');
  }
}
