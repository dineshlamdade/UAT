import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../shared modals/confirmation-modal/confirmation-modal.component';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { PersonalInformationService } from './../personal-information/personal-information.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


export class JoineeModel {
  constructor(
    public sameCode: any,
    public rejoinee: any
  ) { }
}

export class ReJoineeModel {
  constructor(
    public sameCode: any,
    public rejoinee: any,
    public employeeMasterId: any
  ) { }
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LandingPageComponent implements OnInit {
  rejoinee: boolean;
  employeeItem: any;
  employee: any;
  employeeList: Array<any> = [];
  JoineeModel = new JoineeModel('', '')
  ReJoineeModel = new ReJoineeModel('', '', '')
  validRejoinee: boolean = false;
  modalRef: BsModalRef;
  confirmationMsg: string;
  selectedEmployees: Array<any> = [];


  constructor(private router: Router,
    private EventEmitterService: EventEmitterService,
    private PersonalInformationService: PersonalInformationService,
    public dialog: MatDialog,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.PersonalInformationService.getEmployeeList().subscribe(res => {

      this.employeeList = res.data.results[0];
    })
  }


  AddJoinee() {

    this.JoineeModel.rejoinee = false;

    this.router.navigate(['/employee-master/personal-information']);
    setTimeout(() => {
      this.EventEmitterService.getAddjoinee(this.JoineeModel);
    }, 500)
  }

  addReJoinee(user, confirmation) {

    this.rejoinee = true;

    this.confirmationMsg = 'Do you want to proceed with same code?';
    this.modalRef = this.modalService.show(
      confirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );

    // const dialogRef = this.dialog.open(ConfirmationModalComponent, {
    //   width: '664px', height: '241px',
    //   data: { pageValue: 'joinee', info: 'Do you want to proceed with same code?', user: this.employeeItem }
    // });
  }

  employeeSelection(emp) {


    const employeeObject = this.employeeList.filter(res => {
      if (emp == res.employeeMasterId) {
        return res;
      }
    })
    this.employeeItem = employeeObject[0];
    if (this.employeeItem.isActive == 0) {
      this.validRejoinee = true;
    }
    if (this.employeeItem.isActive == 1) {
      this.validRejoinee = false;
    }
  }

  No() {

    this.ReJoineeModel.rejoinee = true;
    this.ReJoineeModel.sameCode = false;
    this.ReJoineeModel.employeeMasterId = this.employeeItem.employeeMasterId;

    this.router.navigate(['/employee-master/personal-information']);
    setTimeout(() => {
      this.EventEmitterService.getAddjoinee(this.ReJoineeModel);
    }, 500)
    this.modalRef.hide();
  }

  Yes() {

    this.ReJoineeModel.rejoinee = true;
    this.ReJoineeModel.sameCode = true;
    this.ReJoineeModel.employeeMasterId = this.employeeItem.employeeMasterId;

    this.router.navigate(['/employee-master/personal-information']);
    setTimeout(() => {
      this.EventEmitterService.getAddjoinee(this.ReJoineeModel);
    }, 500)
    this.modalRef.hide();
  }

  getSelectedEmployees(employee){

    this.employee = employee
    this.employeeSelection(employee.employeeMasterId);
  }
}
