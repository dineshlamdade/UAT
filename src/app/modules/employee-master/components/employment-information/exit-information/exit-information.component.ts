import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExitInformationModel } from './../../../dto-models/employment-forms-models/exit-information.model';
import { EmploymentInformationService } from './../../../employee-master-services/employment-information.service'
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-exit-information',
  templateUrl: './exit-information.component.html',
  styleUrls: ['./exit-information.component.scss']
})
export class ExitInformationComponent implements OnInit {
  ExitForm: FormGroup;
  ExitInformation = new ExitInformationModel('', '', '', '', '', '', '', '');
  employeeMasterId: number;
  employeeExitInfoId: number;
  reasonForLeavingList = 'Personal reason,Family reason,Persue new skills,Health issue'.split(',');
  birthDate: any;


@Input() data:any;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    
   
    
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    
    const birthDate = localStorage.getItem('birthDate')
    this.birthDate = new Date(birthDate);

    this.ExitForm = this.formBuilder.group({
      resignationDate: [''],
      expectedLeavingDate: [''],
      lastWorkingDate: [''],
      reasonForLeaving: [''],
      Exitremark: [''],
      projectedRetirementDate: ['']
    });

    this.EmploymentInformationService.getNumber().subscribe(number =>{
      
      this.employeeExitInfoId=number.text;
      console.log('employeeExitInfoId::', this.employeeExitInfoId);
      this.getExitInformationData(this.employeeExitInfoId);
    })
  //  this.getExitInformationData(this.employeeExitInfoId);

  }

  add_years(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }


  ExitFormSubmit(ExitInformation) {
    // if (ExitInformation.employmentStatusBoolean) {
    //   this.employmentStatusBoolean = ExitInformation.employmentStatusBoolean
    // }

    ExitInformation.resignationDate = this.datepipe.transform(ExitInformation.resignationDate, "dd-MMM-yyyy");
    ExitInformation.expectedLeavingDate = this.datepipe.transform(ExitInformation.expectedLeavingDate, "dd-MMM-yyyy");
    ExitInformation.lastWorkingDate = this.datepipe.transform(ExitInformation.lastWorkingDate, "dd-MMM-yyyy");
    ExitInformation.projectedRetirementDate = this.datepipe.transform(ExitInformation.projectedRetirementDate, "dd-MMM-yyyy");
    ExitInformation.employeeMasterId = this.employeeMasterId;
    // if (this.employeeExitInfoId) {
    // this.EmploymentInformationService.putExitForm(ExitInformation, this.employeeExitInfoId).subscribe(res => {
    //   this.notifyService.showSuccess(res.status.messsage, "Success..!!");
    //   // this.ExitInformation = res.data.results[0];

    //   this.employeeExitInfoId = res.data.results[0].employeeExitInfoId;
    //   // localStorage.setItem('employeeExitInfoId', this.employeeExitInfoId);

    //   if (res.data.results[0]) {
    //     if (res.data.results[0].employeeStatus == 1) {
    //       this.employmentStatusBoolean = 'Active';
    //     } else {
    //       this.employmentStatusBoolean = 'InActive';
    //     }
    //   }
    //   this.selectJoining = '';
    //   this.selectReJoining = '';
    //   this.selectTransferTo = '';
    //   this.selectExit = '';
    //   this.getSummaryEmploymentInfo();
    //   this.TransactionHistorySummary();
    //   this.ExitForm.reset();
    //   this.employmentStatusBoolean = 'Active';
    //   this.dialog.closeAll();
    // })
    // } else {
    this.EmploymentInformationService.postExitForm(ExitInformation).subscribe(res => {
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
      // this.ExitInformation = res.data.results[0];

      this.employeeExitInfoId = res.data.results[0].employeeExitInfoId;
      // localStorage.setItem('employeeExitInfoId', this.employeeExitInfoId);


      this.ExitForm.reset();
    })
    // }

  }

  putExitSubmit(ExitInformation) {
    // if (ExitInformation.employmentStatusBoolean) {
    //   this.employmentStatusBoolean = ExitInformation.employmentStatusBoolean
    // }

    ExitInformation.resignationDate = this.datepipe.transform(ExitInformation.resignationDate, "dd-MMM-yyyy");
    ExitInformation.expectedLeavingDate = this.datepipe.transform(ExitInformation.expectedLeavingDate, "dd-MMM-yyyy");
    ExitInformation.lastWorkingDate = this.datepipe.transform(ExitInformation.lastWorkingDate, "dd-MMM-yyyy");
    ExitInformation.projectedRetirementDate = this.datepipe.transform(ExitInformation.projectedRetirementDate, "dd-MMM-yyyy");
    ExitInformation.employeeMasterId = this.employeeMasterId;

    this.EmploymentInformationService.putExitForm(ExitInformation, ExitInformation.employeeExitInfoId).subscribe(res => {
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
      // this.ExitInformation = res.data.results[0];

      this.employeeExitInfoId = res.data.results[0].employeeExitInfoId;
      // localStorage.setItem('employeeExitInfoId', this.employeeExitInfoId);


      this.ExitForm.reset();
    })
  }

  getExitInformationData(employeeExitInfoId) {
    
    this.EmploymentInformationService.getExitInformation(employeeExitInfoId).subscribe(res => {
      

      if (res.data.results[0]) {
        this.ExitInformation = res.data.results[0];
        
        if (res.data.results[0].projectedRetirementDate) {

          this.ExitInformation.projectedRetirementDate = res.data.results[0].retirementDate;
        }
        else {
          this.ExitInformation.projectedRetirementDate = this.add_years(this.birthDate, 58);
          // this.ExitForm.get('projectedRetirementDate').setValue(this.ExitInformation.projectedRetirementDate);
        }
      }
      
    }, (error: any) => {
      this.ExitInformation.projectedRetirementDate = this.add_years(this.birthDate, 58);
    })
    this.ExitForm.markAsUntouched();
  }

}
