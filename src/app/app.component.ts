import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FlashCard';
  registerForm: FormGroup;
  updateForm:FormGroup;
  arraydata=[];
  public isCollapsed = false;
  selectedItem : any;
  deselectedItem : any;
  flag=false;
  

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){

    this.registerForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      });

      this.updateForm = this.formBuilder.group({
        question: ['', Validators.required],
        answer: ['', Validators.required],
        });

  }

  onSubmit(){

    

    if(this.flag){
      this.arraydata.push(this.updateForm.value);
    }else{
      this.arraydata.push(this.registerForm.value);
    }
    

    this.registerForm.setValue({
      question :'',  
      answer: ''
  });
    console.log("onSubmit Called");
    console.log("form data ",this.registerForm.value);
    console.log("Array data",this.arraydata);

    this.flag=false; 
    
  }

  success(i,j ){
    
    this.deselectedItem= '';
    this.selectedItem= j;
   
   
    // console.log(i,j);
    
   }
   failed(i,j){
    
    this.selectedItem=''
    this.deselectedItem= j;
   
   }

   editField(q,a){

      this.flag=true;

      this.updateForm.setValue({
        question :q,  
        answer: a
    });

    let index = this.arraydata.findIndex((x) => x.question === q && x.answer === a);

      console.log("editField called",q,a);
      console.log("index = ",index);

      this.arraydata.splice(index,1);
     
   }

   deleteField(q,a){
    let index = this.arraydata.findIndex((x) => x.question === q && x.answer === a);
    this.arraydata.splice(index,1);
   }
}
