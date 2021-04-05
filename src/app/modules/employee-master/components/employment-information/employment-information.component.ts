import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmploymentInformationService } from './employment-information.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';

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
  public tabIndex = 0;
  tabSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService, private router: Router) {
    // Active tab selection based on URLS
    if (router.url == '/employee-master/employment-information/employment-summary') {
      this.tabIndex = 0;
      this.EmpSummaryTabValidation();
    }
    if (router.url == '/employee-master/employment-information/joining-information') {
      this.tabIndex = 1;
      this.joiningTabValidation();
    }
    if (router.url == '/employee-master/employment-information/re-joining-information') {
      this.tabIndex = 2;
      this.reJoiningTabValidation();
    }
    if (router.url == '/employee-master/employment-information/transfer-information') {
      this.tabIndex = 3;
      this.transferTabValidation();
    }
    if (router.url == '/employee-master/employment-information/exit-information') {
      this.tabIndex = 4;
      this.exitTabValidation();
    }
  }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    // this.router.navigate(['/employee-master/employment-information/employment-summary']);

    this.EmploymentForm = this.formBuilder.group({
      summary: [''],
      joining: [''],
      rejoining: [''],
      transfer: [''],
      exit: [''],
    });
    this.new = localStorage.getItem('employeeExitInfoId');  //rejoinee
    if (this.new) {                                          //if(this.new=='')
      this.rejoiningBoolean = true;
    }
    if (!this.new) {
      this.rejoiningBoolean = false;
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
      // this.EmploymentInformationService.getExitStatus(this.employeeMasterId).subscribe(res => {
      //   
      //   this.rejoiningBoolean = res.data.results[0];
      // })
    })

    // Active Tab event Subscription from other components
    this.tabSubscription = this.EventEmitterService.setJoiningInitiate().subscribe(res => {

      this.joiningTabValidation()
    })

    this.tabSubscription = this.EventEmitterService.setreJoiningInitiate().subscribe(res => {

      this.reJoiningTabValidation()
    })

    this.tabSubscription = this.EventEmitterService.setTransferInitiate().subscribe(res => {

      this.transferTabValidation()
    })

    this.tabSubscription = this.EventEmitterService.setExitInitiate().subscribe(res => {

      this.exitTabValidation()
    })

    this.tabSubscription = this.EventEmitterService.setEmpSummaryInitiate().subscribe(res => {

      this.EmpSummaryTabValidation()
    })
  }


  EmpSummaryTabValidation() {
    this.EmpSummaryTab = true;
    this.joiningTab = false;
    this.reJoiningTab = false;
    this.transferTab = false;
    this.exitTab = false;
    this.tabIndex = 0;
  }

  joiningTabValidation() {
    this.EmpSummaryTab = false;
    this.joiningTab = true;
    this.reJoiningTab = false;
    this.transferTab = false;
    this.exitTab = false;
    this.tabIndex = 1;
  }

  reJoiningTabValidation() {
    this.EmpSummaryTab = false;
    this.joiningTab = false;
    this.reJoiningTab = true;
    this.transferTab = false;
    this.exitTab = false;
    this.tabIndex = 2;
  }

  transferTabValidation() {
    this.EmpSummaryTab = false;
    this.joiningTab = false;
    this.reJoiningTab = false;
    this.transferTab = true;
    this.exitTab = false;
    this.tabIndex = 3;
  }

  exitTabValidation() {
    this.EmpSummaryTab = false;
    this.joiningTab = false;
    this.reJoiningTab = false;
    this.transferTab = false;
    this.exitTab = true;
    this.tabIndex = 4;
  }

}
