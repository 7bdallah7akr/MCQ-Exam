import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DoctorService } from '../../service/doctor.service';

@Component({
  selector: 'app-new-exam',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.css'
})
export class NewExamComponent implements OnInit {
  currentPage: string = 'page1';
  name = new FormControl();
  questions: any[] = [];
  correctNum: string = '';
  id: any;
  itemEdit: any;
  preview: boolean = false;
  questionsForm!: FormGroup;

  private fb = inject(FormBuilder);
  private service = inject(DoctorService);

  constructor() {
    this.questionsForm = this.fb.group({
      question: ['', [Validators.required]],
      answerA: ['', [Validators.required]],
      answerB: ['', [Validators.required]],
      answerC: ['', [Validators.required]],
      answerD: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  setPage(page: string) {
    this.currentPage = page;
  }
  cheakName() {
    if (this.name.value) {
      this.setPage('page2');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter the name of the subject.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  getCorrect(value: string) {
    this.correctNum = value;
  }
  creatQuestion() {
    if (this.correctNum) {
      const model = {
        question: this.questionsForm.value.question,
        answerA: this.questionsForm.value.answerA,
        answerB: this.questionsForm.value.answerB,
        answerC: this.questionsForm.value.answerC,
        answerD: this.questionsForm.value.answerD,
        correctAnswer: this.correctNum
      };
      this.questions.push(model);
      this.questionsForm.reset();
      this.correctNum = '';
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please choose the correct answer.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  clear() {
    this.questionsForm.reset();
    this.correctNum = '';
  }
  cancel() {
    this.clear();
    this.questions = [];
    this.name.reset();
    this.setPage('page1');
    if (this.id) {
      this.service.delete(this.id).subscribe((res: any) => {
      });
    }
  }

  submit() {
    const model = {
      name: this.name.value,
      questions: this.questions
    }
    if (this.questions.length > 0) {
      this.service.creatSubject(model).subscribe((res: any) => {
        this.preview = true;
        this.id = res.id;
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter save first.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  previewQuestion() {
    this.setPage('page3');
  }
  
  onDelete(index: number) {
    this.questions.splice(index, 1);
    if (this.questions.length === 0) {
      this.setPage('page2');
      const model = {
        name: this.name.value,
        questions: this.questions
      };
      this.service.updateSubject(model, this.id).subscribe(res => {
        Swal.fire({
          title: 'Success!',
          text: 'The question has been successfully deleted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
    } else {
      const model = {
        name: this.name.value,
        questions: this.questions
      };
      this.service.updateSubject(model, this.id).subscribe(res => {
        Swal.fire({
          title: 'Success!',
          text: 'The question has been successfully deleted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
    }
  }
  edit(index: number) {
    this.itemEdit = this.questions[index];
    this.setPage('page2');
    this.questionsForm.setValue({
      question: this.itemEdit.question,
      answerA: this.itemEdit.answerA,
      answerB: this.itemEdit.answerB,
      answerC: this.itemEdit.answerC,
      answerD: this.itemEdit.answerD,
    });
    this.correctNum = this.itemEdit.correctAnswer;
  }
  update() {
    const updatedQuestion = {
      question: this.questionsForm.value.question,
      answerA: this.questionsForm.value.answerA,
      answerB: this.questionsForm.value.answerB,
      answerC: this.questionsForm.value.answerC,
      answerD: this.questionsForm.value.answerD,
      correctAnswer: this.correctNum,
    };
    const index = this.questions.findIndex(q => q.question === this.itemEdit.question);
    if (index !== -1) {
      this.questions[index] = updatedQuestion;
    }
    const model = {
      name: this.name.value,
      questions:{
        question: this.questionsForm.value.question,
        answerA: this.questionsForm.value.answerA,
        answerB: this.questionsForm.value.answerB,
        answerC: this.questionsForm.value.answerC,
        answerD: this.questionsForm.value.answerD,
        correctAnswer: this.correctNum
      }
    };
    this.service.updateSubject(model, this.id).subscribe(res => {
      Swal.fire({
        title: 'Success!',
        text: 'The question has been successfully updateed.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.setPage('page3');
    })
  }
  listFinish(){
    this.preview = false;
    this.setPage('page1');
    this.questions = [];
    this.name.reset();
  }

}
