import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulacreationComponent } from './formulacreation/formulacreation.component';
import { FormulamasterComponent } from './formulamaster.component';
import { KeywordmasterComponent } from './keywordmaster/keywordmaster.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:   'formulamaster',
        component:  FormulamasterComponent,
        data: { title: ':: DelziaHR :: Formula' },
        
      },
      {
        path: 'keywordmaster',
        component: KeywordmasterComponent,
        data: { title: ':: Delizia-HR :: Keywork Master' },
       
      },
      {
        path: 'formulacreation',
        component: FormulacreationComponent,
        data: { title: ':: Delizia-HR :: Formula Creation' },
       
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulamasterRoutingModule { }
