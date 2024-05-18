import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Contact } from '../contact';
// import { Location } from '@angular/common';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{


  constructor(private contactService:ContactService,private router:Router,private route:ActivatedRoute){}

  reactiveForm!: FormGroup;
  // id:number=-1;
  value:string="Add";
  currentContactObject:Contact={
    id:0,
    name: '',
    email: '',
    mobilenumber: '',
    landline: '',
    website: '',
    address: ''
  };

  id:number=0;

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);

    if(this.router.url.includes('add-contact')){
      this.value="Add";
    }
    else{
      this.value="Update";
      this.currentContactObject.id=this.id;
     this.contactService.getContact(this.id).subscribe((contact)=>{
      this.currentContactObject=contact;
      this.setFormDetails();

    })
    }
    
    this.setFormDetails();
    
  }

  setFormDetails(){
    this.reactiveForm=new FormGroup({
      name:new FormControl(this.currentContactObject.name,[Validators.required]),
      email:new FormControl(this.currentContactObject.email,[Validators.required,Validators.email]),
      mobilenumber:new FormControl(this.currentContactObject.mobilenumber,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      landline:new FormControl(this.currentContactObject.landline),
      website:new FormControl(this.currentContactObject.website),
      address:new FormControl(this.currentContactObject.address)
    })
  }
  onSubmit(){
   console.log(this.reactiveForm)
   console.log(this.reactiveForm.get('name').touched);
   
    this.currentContactObject=this.reactiveForm.value;
    // console.log();
    this.currentContactObject["id"]=this.id;
    
    if(this.value==="Add")
        this.contactService.addContact(this.currentContactObject).subscribe((contact)=>{
          this.id=contact.id;
          this.contactService.fetchContacts();
          this.router.navigate([`/details/${this.id}`]);
        });
    else
        {
          this.contactService.updateContact(this.currentContactObject).subscribe((response)=>{
            console.log(response);
            this.contactService.fetchContacts();
          });
        this.router.navigate([`/details/${this.id}`]);
        }
    
    
  }

  closeForm(){
    history.back() ;
  }
}
