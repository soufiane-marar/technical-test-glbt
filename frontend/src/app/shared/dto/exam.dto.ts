

export interface ExamDto {
  student: Student;
  meeting_point: string;
  date: string;
  status: ExamStatus;
}

interface Student {
  first_name: string;
  last_name: string;
}

export enum ExamStatus {
  AOrganiser = "A organiser",
  Annule = "Annulé",
  RechercheDePlace = "Recherche de place",
  Confirme = "Confirmé"
}
