import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-group-or-company-selection',
  templateUrl: './group-or-company-selection.component.html',
  styleUrls: ['./group-or-company-selection.component.scss']
})
export class GroupOrCompanySelectionComponent implements OnInit {
  groupCompanyData: any;
  distinctCountries: any;
  distinctGroups: any;
  distinctCompanies: any;
  distinctRoles: Array<any>=[];
  companyName: any;

  constructor( private service: AuthService,private router: Router) { }

  ngOnInit(): void {

    this.service.checkUser().subscribe(res=>{
     
      this.groupCompanyData = res.data.results; 
      this.distinctCountries = this.groupCompanyData.map(item => item.country).filter((value, index, self) => self.indexOf(value) === index)
    //      console.log('this.distinctCountries',this.distinctCountries)
    },(err)=>{
      err.error.status.message
    })

  }

  onChangeCountry(country){
    this.distinctGroups = this.groupCompanyData.filter(ele=>ele.country==country).map(item => item.companyGroupName).filter((value, index, self) => self.indexOf(value) === index)
    //console.log('this.distinctGroups',this.distinctGroups)
  }
  onChangeGroup(group){
    this.distinctCompanies= this.groupCompanyData.filter(ele=>ele.companyGroupName==group).map(item => item.companyName).filter((value, index, self) => self.indexOf(value) === index)
    //console.log('this.distinctCompanies',this.distinctCompanies)
  }
  companySelection(companyName){
    this.companyName=companyName;
  }

  redictionTo(){
    let dataCompany = this.groupCompanyData.find(a=>a.companyName==this.companyName);
    if(dataCompany.type=='Admin'){
      this.router.navigate(['/employee-master/emp-master-landing-page']);
    }else{
      this.router.navigate(['/dashboard']);
    }
  }
}
