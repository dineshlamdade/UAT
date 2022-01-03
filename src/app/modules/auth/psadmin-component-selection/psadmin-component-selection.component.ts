import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-psadmin-component-selection',
  templateUrl: './psadmin-component-selection.component.html',
  styleUrls: ['./psadmin-component-selection.component.scss']
})
export class PsadminComponentSelectionComponent implements OnInit {
  distinctRoles: Array<any>=[];
  globalUser: boolean;

  constructor( private service: AuthService) { }

  ngOnInit(): void {

    this.service.checkUser().subscribe(res=>{
     

      this.distinctRoles = res.data.results.map(item => item.type).filter((value, index, self) => self.indexOf(value) === index)
    console.log('distinct Roles', this.distinctRoles);
//   if( this.distinctRoles.includes('Global')){
// this.globalUser=true;
//   }
    },(err)=>{
      err.error.status.message
    })
  
  }


  
  
}
