import { Component, OnInit } from '@angular/core';
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

  constructor( private service: AuthService,) { }

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
    this.distinctGroups = this.groupCompanyData.filter(ele=>ele.country==country).map(item => item.code).filter((value, index, self) => self.indexOf(value) === index)
    //console.log('this.distinctGroups',this.distinctGroups)
  }
  onChangeGroup(group){
    this.distinctCompanies= this.groupCompanyData.filter(ele=>ele.code==group).map(item => item.companyGroupCode).filter((value, index, self) => self.indexOf(value) === index)
    //console.log('this.distinctCompanies',this.distinctCompanies)
  }
}
