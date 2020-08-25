
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// imports necessary to create routes
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

// Routes tell the Router which view to display when a user clicks a link
// or pastes a URL into the browser address bar
const routes: Routes = [

  // default route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent }, // path - string matched to the URL
  { path: 'detail/:id', component: HeroDetailComponent }

];


//@NgModule metadata initializes router and starts it listening for browser location changes
@NgModule({

  // adds routerModule and configures it with routs provided above
  imports: [RouterModule.forRoot(routes)],

  // makes routerModule available throughout the web application
  exports: [RouterModule]
})

export class AppRoutingModule { }