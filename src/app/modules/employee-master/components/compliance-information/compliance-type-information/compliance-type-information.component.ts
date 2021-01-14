import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-compliance-type-information',
  templateUrl: './compliance-type-information.component.html',
  styleUrls: ['./compliance-type-information.component.scss']
})
export class ComplianceTypeInformationComponent implements OnInit {
  searchForm: FormGroup;
  assignmentsList = 'Provident Fund,Employee Pension Scheme,Employee State Insurance,Professional Tax,Labor Welfare Fund,Gratuity Details,Super Annuation,Tax Deduction At Source'.split(',');
  assignmentModel: any;
  nextSubscription: Subscription;
  filteredContributionMethods: Array<any> = [];


  constructor(private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    this.nextSubscription = this.EventEmitterService.setNextToAssignment().subscribe(res=>{
      this.assignmentModel = res;
    })
  }


  filterContributionMethods(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.assignmentsList.length; i++) {
      let country = this.assignmentsList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredContributionMethods = filtered;
  }
}
