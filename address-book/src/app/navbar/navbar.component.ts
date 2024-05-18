import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  imageSrc:string='../assets/blog-icon.png';
constructor(private contactService:ContactService,private router:Router){}
  navigateToFirstContact(){
    let contacts=[];
      this.contactService.getContacts().subscribe(c=>{
        contacts=c;

        if(contacts.length!=0)
        this.router.navigate([`/details/${contacts[0].id}`]);
      else
        this.router.navigate(['/home']);
      })
      
     
      
      
      
  }
}
