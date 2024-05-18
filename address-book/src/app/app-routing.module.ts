import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { CreateComponent } from './create/create.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path:'home',
    component:CreateComponent
  },
  {
    path:'details/:id',
    component:ContactDetailsComponent
  },
  {
    //1
    path:'edit/:id',
    component:FormComponent
  },
  {
    path:'add-contact',
    component:FormComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
