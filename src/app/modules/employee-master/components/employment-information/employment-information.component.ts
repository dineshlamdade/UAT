import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmploymentInformationService } from './../../employee-master-services/employment-information.service';
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


  constructor(private formBuilder: FormBuilder,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.EmploymentForm = this.formBuilder.group({
      summary: [''],
      joining: [''],
      rejoining: [''],
      transfer: [''],
      exit: [''],
    });debugger
    this.new = localStorage.getItem('rejoinee');
     if(this.new == 'true'){
       this.rejoiningBoolean = true;
     }
     if(!this.new){
      this.rejoiningBoolean = false;
     }
    // this.EmploymentInformationService.getExitStatus(this.employeeMasterId).subscribe(res => {
    //   debugger
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
      debugger
      this.rejoiningBoolean = res.rejoinee;
      // this.EmploymentInformationService.getExitStatus(this.employeeMasterId).subscribe(res => {
      //   debugger
      //   this.rejoiningBoolean = res.data.results[0];
      // })
    })
  }

}
