import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  
    constructor(private contactService:ContactService,private route:ActivatedRoute,private router:Router){      
    }
    currentRoute:string;
    contacts:Array<Contact>=[];
    id:number;
    selectedContact?:Contact;
    // private subscription: Subscription;

    ngOnInit(){
      // this.getId();
      this.contactService.updateSubject.subscribe((data)=>{
        this.contacts=data;
        this.id=Number(this.route.snapshot.paramMap.get('id'));
        console.log("Current Id: ",this.id);
      })

      console.log('url: ',this.route.snapshot.paramMap); 
    }
  
    updateSelectedContact(id:number){
      this.id=id;
      console.log("updated : ",this.id);

    }
  
  }
