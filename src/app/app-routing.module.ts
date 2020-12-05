import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { ShoutComponent } from './shout/shout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{path: '', component: SigninComponent},
{path: 'signup', component: SignupComponent},
{path: 'home', component: HomeComponent},
{path: 'add', component: AddComponent},
{path: 'shout', component: ShoutComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
