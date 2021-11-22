import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmploymentInformationService } from './employment-information.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-employment-information',
  templateUrl: './employment-information.component.html',
  styleUrls: ['./employment-information.component.scss']
})
export class EmploymentInformationComponent implements OnInit {
  selectionEmploymentBoolean: boolean = false;
  employementJoiningInfoId: any;
  RejoiningEmployementInfoId: any;;
  EmploymentForm: FormGroup;
  transferBoolean: boolean;
  rejoiningBoolean: boolean = false;
  exitBoolean: boolean;
  employeeMasterId: number;
  statusSubscription: Subscription;
  new: any;
  EmpSummaryTab: boolean = true;
  joiningTab: boolean = false;
  reJoiningTab: boolean = false;
  transferTab: boolean = false;
  exitTab: boolean = false;

  EmpSummaryTabRouter: boolean ;
  joiningTabRouter: boolean ;
  reJoiningTabRouter: boolean;
  transferTabRouter: boolean;
  exitTabRouter: boolean;
  sub:string='';
  public tabIndex = 0;
  tabSubscription: Subscription;
  TransactionHistory: any;
  LastTransaction: any;

  constructor(private formBuilder: FormBuilder,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService, private router: Router) {
    // Active tab selection based on URLS

    if (router.url == '/employee-master/employment-information/employment-summary') {
      this.tabIndex = 0;
     // this.sub='Summary'
      this.EmpSummaryTabRouter = true;
     // this.EmpSummaryTabValidation(this.sub);
    }
    if (router.url == '/employee-master/employment-information/joining-information') {
      this.tabIndex = 1;
      this.sub='Joining'
      this.joiningTabRouter = true;
    //  this.joiningTabValidation(this.sub);
    }
    if (router.url == '/employee-master/employment-information/re-joining-information') {
      this.tabIndex = 2;
      this.sub='Re-Joining'
      this.reJoiningTabRouter = true;
      //this.reJoiningTabValidation(this.sub);
    }
    if (router.url == '/employee-master/employment-information/transfer-information') {
      this.tabIndex = 3;
      this.sub='Transfer'
      this.transferTabRouter = true;
      //this.transferTabValidation(this.sub);
    }
    if (router.url == '/employee-master/employment-information/exit-information') {
      this.tabIndex = 4;
      this.sub='Exit'
      this.exitTabRouter = true;

    //  this.exitTabValidation(this.sub);
    
    }
  }

  ngOnInit(): void {


 
    console.log('employee Master Id as adEmp',JSON.parse(localStorage.getItem("adEmp")).employeeMasterId);

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.lastTab();
    // this.router.navigate(['/employee-master/employment-information/employment-summary']);

    this.EmploymentForm = this.formBuilder.group({
      summary: [''],
      joining: [''],
      rejoining: [''],
      transfer: [''],
      exit: [''],
    });


    this.new = localStorage.getItem('employeeExitInfoId');
    if (this.new) {
      this.rejoiningBoolean = true;
     // this.exitTab = false;
    }
    if (!this.new) {
      this.rejoiningBoolean = false;
     // this.exitTab = true;
    }
    // this.EmploymentInformationService.getExitStatus(this.employeeMasterId).subscribe(res => {
    //   this.rejoiningBoolean = res.data.results[0];
    // })

    this.employementJoiningInfoId = Number(localStorage.getItem('employementJoiningInfoId'));

    this.RejoiningEmployementInfoId = Number(localStorage.getItem('RejoiningEmployementInfoId'));


    let tabStatus = localStorage.getItem('selectionBoolean');
    if (tabStatus == 'ReJoining') {
      this.selectionEmploymentBoolean = true;
    }
    if (tabStatus == 'Joining') {
      this.selectionEmploymentBoolean = false;
    }

    this.statusSubscription = this.EventEmitterService.setRejoineeStatusCode().subscribe(res => {

      this.rejoiningBoolean = res.rejoinee;
      this.LastTabValidation();
      // this.EmploymentInformationService.getExitStatus(this.employeeMasterId).subscribe(res => {
      //   
      //   this.rejoiningBoolean = res.data.results[0];
      // })
    })

    // Active Tab event Subscription from other components
    this.tabSubscription = this.EventEmitterService.setJoiningInitiate().subscribe(res => {
      this.joiningTabRouter=true;
      this.tabIndex=1;   
      this.LastTabValidation();   
    })

    this.tabSubscription = this.EventEmitterService.setreJoiningInitiate().subscribe(res => {
      this.reJoiningTabRouter=true;
      this.tabIndex=2;
      this.LastTabValidation();
    })

    this.tabSubscription = this.EventEmitterService.setTransferInitiate().subscribe(res => {
     this.transferTabRouter=true;
     this.tabIndex=3;
     this.LastTabValidation();
    })

    this.tabSubscription = this.EventEmitterService.setExitInitiate().subscribe(res => {
      this.exitTabRouter=true;
      this.tabIndex=4;
      this.LastTabValidation();
    })

    this.tabSubscription = this.EventEmitterService.setEmpSummaryInitiate().subscribe(res => {
      this.EmpSummaryTabRouter=true;
      this.tabIndex=0;
      this.LastTabValidation();
    })
    this.LastTabValidation();
  }



  EmpSummaryTabValidation() {
    this.tabIndex = 0;
    this.EmpSummaryTabRouter = true;
    this.joiningTabRouter = false;
    this.reJoiningTabRouter = false;
    this.transferTabRouter = false;
    this.exitTabRouter = false;
  }

  joiningTabValidation() {
    this.tabIndex = 1;
   this.EmpSummaryTabRouter = false;
    this.joiningTabRouter = true;
    this.reJoiningTabRouter = false;
    this.transferTabRouter = false;
    this.exitTabRouter = false;
  }

  reJoiningTabValidation() {
    this.tabIndex = 2;  
    this.EmpSummaryTabRouter = false;
    this.joiningTabRouter = false;
    this.reJoiningTabRouter = true;
    this.transferTabRouter = false;
    this.exitTabRouter = false;
  }

  transferTabValidation() {
    this.tabIndex = 3;
    this.EmpSummaryTabRouter = false;
    this.joiningTabRouter = false;
    this.reJoiningTabRouter = false;
    this.transferTabRouter = true;
    this.exitTabRouter = false;
}

  exitTabValidation() {
    this.tabIndex = 4; 
    this.EmpSummaryTabRouter = false;
    this.joiningTabRouter = false;
    this.reJoiningTabRouter = false;
    this.transferTabRouter = false;
    this.exitTabRouter = true;
  }

  LastTabValidation() {
    this.LastTransaction=localStorage.getItem('LastTransaction');
    if(this.LastTransaction=="Joining"){
    this.EmpSummaryTab = true;
    this.joiningTab = false;
    this.reJoiningTab = false;
    this.transferTab = true;
    this.exitTab=true;
  }else if(this.LastTransaction=="Re-Joining"){
    this.EmpSummaryTab = true;
    this.joiningTab = false;
    this.reJoiningTab = false;
    this.transferTab = true;
    this.exitTab=true;
  }else if(this.LastTransaction=="Transfer"){
    this.EmpSummaryTab = true;
    this.joiningTab = false;
    this.reJoiningTab = false;
    this.transferTab = true;
    this.exitTab=true;
  }else if(this.LastTransaction=="Exit"){
    this.EmpSummaryTab = true;
    this.joiningTab = false;
    this.reJoiningTab = true;
    this.transferTab = false;
    this.exitTab=false;
  }
  }
  

  lastTab(): any {
    const empId = localStorage.getItem('employeeMasterId')
    this.EmploymentInformationService.getTransactionHistory(empId).subscribe(res => {

      this.TransactionHistory = res.data.results[0];
     
      if (this.TransactionHistory.length > 0) {
        this.LastTransaction = this.TransactionHistory[this.TransactionHistory.length - 1].transaction;

        
        localStorage.setItem('LastTransaction', this.LastTransaction);
      }
   
    },(error: any) => {
     // this.joiningTabValidation();
    });
     
  }


}