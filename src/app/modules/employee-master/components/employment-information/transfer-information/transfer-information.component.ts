import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransferToModel } from './../employment-forms-models/transfer-to.model';
import { EmploymentInformationService } from './../employment-information.service'
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';


@Component({
  selector: 'app-transfer-information',
  templateUrl: './transfer-information.component.html',
  styleUrls: ['./transfer-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransferInformationComponent implements OnInit {

  TransferForm: FormGroup;
  TransferToInformation = new TransferToModel('', '', '', '');
  selectTransferTo: any;
  employeeMasterId: number;
  setSubmitTransferExitFormSubscription: Subscription;
  transferToSubscription: Subscription;
  employeeTransferId: number;
  temp: any[];
  JoiningDate: any;
  // companyListForJoining = 'Accenture,TCS,Amdocs,Cognizant,Infosys,WhiteHedge,CloudHedge,Zensar,Google,Straviso,Anar Solutions,Microsoft'.split(',');
  companyListForJoining: Array<any> = [];
  viewTransfer: boolean = false;
  editTransfer: boolean = false;
  public currentCompany:any;
  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService,
    private router: Router, private CommonDataService: SharedInformationService) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);


    this.TransferForm = this.formBuilder.group({
      transferTo: [''],
      effectiveDate: [''],
      transferRemark: [''],
    });
    const JoiningDate = localStorage.getItem('joiningDate');
    this.JoiningDate = new Date(JoiningDate)
    //get group companies infomartion
    this.EmploymentInformationService.getJoiningInformation(this.employeeMasterId).subscribe(res =>{
      this.currentCompany=res.data.results[0]["companyName"];
     
    })
    this.EmploymentInformationService.getCompanyInformation().subscribe(res => {

      let list = res.data.results;

      list.forEach(element => {
      
        this.companyListForJoining.push(element.companyName);
        
      }); 
      this.companyListForJoining.forEach((element,index)=>{
        if(element==this.currentCompany) this.companyListForJoining.splice(index,1);
     });
    })
    
    this.EmploymentInformationService.getNumber().subscribe(number => {

      this.employeeTransferId = number.text;
      this.getTranferToData(this.employeeTransferId);
    })

    this.transferToSubscription = this.EventEmitterService.setTransferToData().subscribe(res => {

      if (res) {
        this.employeeTransferId = res.transferId
        this.viewTransfer = res.viewTransfer;
        this.editTransfer = res.editTransfer;
        this.getTranferToData(this.employeeTransferId);

        if (this.viewTransfer == true) {
          const transferTo = this.TransferForm.get('transferTo');
          transferTo.disable();
          const effectiveDate = this.TransferForm.get('effectiveDate');
          effectiveDate.disable();
          const transferRemark = this.TransferForm.get('transferRemark');
          transferRemark.disable();
        }
      }
    })
  }



  transferToFormSubmit(TransferToInformation) {

    TransferToInformation.employeeMasterId = this.employeeMasterId
    TransferToInformation.effectiveDate = this.datepipe.transform(TransferToInformation.effectiveDate, "dd-MMM-yyyy");
    TransferToInformation.companyId = 1;

    if (this.employeeTransferId) {
      this.putTransferFormSubmit(TransferToInformation);
    } else {
      localStorage.setItem('LastTransaction', 'Transfer');
      this.EmploymentInformationService.postTransferToForm(TransferToInformation).subscribe(res => {
        // this.TransferToInformation = res.data.results[0];
        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        this.TransferForm.reset();
        
        this.EventEmitterService.getEmpSummaryInitiate();
        this.router.navigate(['/employee-master/employment-information/employment-summary']);
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    }
  }
  putTransferFormSubmit(TransferToInformation) {

    TransferToInformation.employeeMasterId = this.employeeMasterId
    TransferToInformation.effectiveDate = this.datepipe.transform(TransferToInformation.effectiveDate, "dd-MMM-yyyy");
    TransferToInformation.companyId = 1;
    // if (this.employeeTransferId) {
    this.EmploymentInformationService.putTransferToForm(TransferToInformation, TransferToInformation.employeeTransferId).subscribe(res => {
      // this.TransferToInformation = res.data.results[0];
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!");

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.TransferForm.reset();
      this.EventEmitterService.getEmpSummaryInitiate();
      this.router.navigate(['/employee-master/employment-information/employment-summary']);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }


  getTranferToData(employeeTransferId) {
    if ('') {
      this.JoiningDate = localStorage.getItem('joiningDate');
    } else {
      this.JoiningDate = localStorage.getItem('rejoiningDate');
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

  cancel() {
    this.EventEmitterService.getEmpSummaryInitiate();
  }
}

