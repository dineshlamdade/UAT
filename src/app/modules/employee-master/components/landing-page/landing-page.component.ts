import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../shared modals/confirmation-modal/confirmation-modal.component';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { PersonalInformationService } from './../../employee-master-services/personal-information/personal-information.service';


export class JoineeModel {  
  constructor(  
    public sameCode: any,
    public rejoinee: any
  ){} 
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  rejoinee: boolean;
  employeeItem: any;
  employee: any;
  employeeList: Array<any> = [];
  JoineeModel = new JoineeModel('', '')
  validRejoinee: boolean = false;


  constructor(private router: Router,
    private EventEmitterService: EventEmitterService,
    private PersonalInformationService: PersonalInformationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.PersonalInformationService.getEmployeeList().subscribe(res=>{

      this.employeeList = res.data.results[0];
    })
  }


  AddJoinee(){
   
    this.JoineeModel.rejoinee = false;
  
    this.router.navigate(['/employee-master/personal-information']);
    setTimeout(() => {
      this.EventEmitterService.getAddjoinee(this.JoineeModel);
    }, 500)
  }

  addReJoinee(user){
    debugger
    this.rejoinee = true;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '664px', height: '241px',
      data: { pageValue: 'joinee', info: 'Do you want to proceed with same code?', user: this.employeeItem }
    });
  }

  employeeSelection(emp){
    debugger
   
    const employeeObject = this.employeeList.filter(res=>{
      if(emp == res.employeeMasterId){
        return res;
      }
    })
    this.employeeItem = employeeObject[0];
    if(this.employeeItem.isActive == 1){
      this.validRejoinee = true;
    }
  }
}
