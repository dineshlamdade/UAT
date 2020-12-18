import { Component, OnInit, Input } from '@angular/core';
import { EventEmitterService } from './../../../../employee-master-services/event-emitter/event-emitter.service';


@Component({
  selector: 'app-sub-compliance-type-information',
  templateUrl: './sub-compliance-type-information.component.html',
  styleUrls: ['./sub-compliance-type-information.component.scss']
})
export class SubComplianceTypeInformationComponent implements OnInit {
  @Input() assignmentModel: any;
  reasonForExitList = 'Personal reason,Family reason,Persue new skills,Health issue'.split(',');
  applicableModel: any = 'yes';


  constructor(private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  PFSubscriberValidation(event) {

    if (event.value == "yes") {
      this.applicableModel = "yes";
      // this.familyMemberInfoRequestDTO.companyMediclaimApplicable = 1;
    } else {
      this.applicableModel = "no";
      // this.familyMemberInfoRequestDTO.companyMediclaimApplicable = 0;
    }
  }

  nextTo(assignment){
    this.EventEmitterService.getNextToAssignment(assignment);
  }

  previousFrom(assignment){
    this.EventEmitterService.getNextToAssignment(assignment);
  }
}
