import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransferToModel } from './../../../dto-models/employment-forms-models/transfer-to.model';
import { EmploymentInformationService } from './../../../employee-master-services/employment-information.service'
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-transfer-information',
  templateUrl: './transfer-information.component.html',
  styleUrls: ['./transfer-information.component.scss']
})
export class TransferInformationComponent implements OnInit {

  TransferForm: FormGroup;
  TransferToInformation = new TransferToModel('', '', '', '');
  selectTransferTo: any;
  employeeMasterId: number;
  setSubmitTransferExitFormSubscription: Subscription;
  employeeTransferId: number;
  temp: any[];
  JoiningRejoiningDate: any;
 // companyListForJoining = 'Accenture,TCS,Amdocs,Cognizant,Infosys,WhiteHedge,CloudHedge,Zensar,Google,Straviso,Anar Solutions,Microsoft'.split(',');
 companyListForJoining: Array<any> = [];


  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {



    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);


    this.TransferForm = this.formBuilder.group({
      transferTo: [''],
      effectiveDate: [''],
      transferRemark: [''],
    });

    //get group companies infomartion
    this.EmploymentInformationService.getCompanyInformation().subscribe(res => {
      debugger
      let list=res.data.results;
      list.forEach(element => {
        debugger
        this.companyListForJoining.push(element.companyName);
      });
      
    })
    this.EmploymentInformationService.getNumber().subscribe(number =>{
      
      this.employeeTransferId=number.text;
      console.log('employeeTransferId::', this.employeeTransferId);
      this.getTranferToData(this.employeeTransferId);
    })
   
  }



  transferToFormSubmit(TransferToInformation) {

    TransferToInformation.employeeMasterId = this.employeeMasterId
    TransferToInformation.effectiveDate = this.datepipe.transform(TransferToInformation.effectiveDate, "dd-MMM-yyyy");
    TransferToInformation.companyId = 1;
    // if (this.employeeTransferId) {
    //   this.EmploymentInformationService.putTransferToForm(TransferToInformation, this.employeeTransferId).subscribe(res => {
    //     // this.TransferToInformation = res.data.results[0];
    //     this.notifyService.showSuccess(res.status.messsage, "Success..!!");
    //     this.selectJoining = '';
    //     this.selectReJoining = '';
    //     this.selectTransferTo = '';
    //     this.selectExit = '';
    //     this.getSummaryEmploymentInfo();
    //     this.TransactionHistorySummary();
    //     this.TransferForm.reset();
    //     this.dialog.closeAll();
    //   })
    // } else {
    this.EmploymentInformationService.postTransferToForm(TransferToInformation).subscribe(res => {
      // this.TransferToInformation = res.data.results[0];
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!");

      this.TransferForm.reset();
    })
    // }
  }
  putTransferFormSubmit(TransferToInformation) {

    TransferToInformation.employeeMasterId = this.employeeMasterId
    TransferToInformation.effectiveDate = this.datepipe.transform(TransferToInformation.effectiveDate, "dd-MMM-yyyy");
    TransferToInformation.companyId = 1;
    // if (this.employeeTransferId) {
    this.EmploymentInformationService.putTransferToForm(TransferToInformation, TransferToInformation.employeeTransferId).subscribe(res => {
      // this.TransferToInformation = res.data.results[0];
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!");

      this.TransferForm.reset();
    })
    // } 
    // else {
    // this.EmploymentInformationService.postTransferToForm(TransferToInformation).subscribe(res => {
    //   // this.TransferToInformation = res.data.results[0];
    //   this.notifyService.showSuccess(res.status.messsage, "Success..!!");
    //   this.selectJoining = '';
    //   this.selectReJoining = '';
    //   this.selectTransferTo = '';
    //   this.selectExit = '';
    //   this.getSummaryEmploymentInfo();
    //   this.TransactionHistorySummary();
    //   this.TransferForm.reset();
    //   this.dialog.closeAll();
    // })
    // }
  }


  getTranferToData(employeeTransferId) {
    if ('') {
      this.JoiningRejoiningDate = localStorage.getItem('joiningDate');
    } else {
      this.JoiningRejoiningDate = localStorage.getItem('rejoiningDate');
    }
    //get transfer info service 1
    this.EmploymentInformationService.getTransferToInformation(employeeTransferId).subscribe(res => {
      this.TransferToInformation = res.data.results[0];
    })
    this.TransferForm.markAsUntouched();
  }


  resetTranferToForm() {
    this.TransferForm.reset();
  }
}

