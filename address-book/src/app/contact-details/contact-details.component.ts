import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit{
  constructor(private contactService:ContactService,private route:ActivatedRoute,private router:Router){}
  

  contact:Contact;
  id:number;
  contacts:Array<Contact>=[];

    ngOnInit(){
      this.route.paramMap.subscribe((param)=>{
        this.getId();
        this.getContact();
        console.log("Details Router: ",this.router.url);
      });
    }
    getId(){
      this.id=Number(this.route.snapshot.paramMap.get('id')); 
      console.log("Details: ",this.id); 
    }
    getContact(){  
     
      this.contactService.getContact(this.id).subscribe((contact)=>{
        this.contact=contact;
      })
    }

    deleteContact(){
      this.contactService.getContacts().subscribe((contacts)=>{
        this.contacts=contacts;
        console.log(this.contacts);

        if(contacts.length==1)
          {
            this.router.navigate([`/home`]);
          }
        let index:number=this.contacts.findIndex(obj=> obj.id==this.contact.id);

        console.log(this.contact.id);
        
        if(index==0)
          index=2;
          console.log(index);
       
        console.log(contacts[index-1].id);
        this.router.navigate([`/details/${contacts[index-1].id}`]);
      })
      this.contactService.deleteContact(this.contact).subscribe((msg)=>{
        this.contactService.fetchContacts();
      });
      
      
      
      
    }
}
