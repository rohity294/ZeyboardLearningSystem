import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FinwiseComponent } from './components/ai-components/finwise/finwise.component';
import { IPrepComponent } from './components/ai-components/iprep/iprep.component';
import { IntellisenseComponent } from './components/ai-components/intellisense/intellisense.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'finwise', component: FinwiseComponent },
  { path: 'iprep', component: IPrepComponent },
  { path: 'intellisense', component: IntellisenseComponent },

  //profile urls
  {path: 'profiles/:profileID', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
