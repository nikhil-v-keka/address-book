import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Contact } from './contact';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http:HttpClient) {
    this.fetchContacts();
  }
  private apiUrl=environment.apiUrl;
  public updateSubject=new BehaviorSubject<Contact[]>([]);
  ngOnInit() {}
 
  fetchContacts(){
    this.http.get<Contact[]>(`${this.apiUrl}/contacts`).subscribe((data)=>{
      this.updateSubject.next(data);
    })
  }
  getContacts():Observable<Contact[]> {
    return  this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  getContact(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`);
  }

  addContact(contact: Contact):Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts`,contact);
  }

  deleteContact(contact: Contact) {
     return this.http.delete<unknown>(`${this.apiUrl}/contacts/${contact.id}`);
  }

  updateContact(contact: Contact) {
    return this.http.put<Contact>(`${this.apiUrl}/contacts/${contact.id}`,contact);
  }
}
