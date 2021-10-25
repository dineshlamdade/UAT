import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QueryService } from '../../query/query.service';
import { PayrollInputsService } from '../payroll-inputs.service';


export interface User1 {
  checked;
  headtype;
  headcode;
  headdesc;
  openingval;
  chngamount;
  chngper;
  closingamt;
  unitofmeasure;
  remark;
}
@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.scss']
})



export class PayrollListComponent implements OnInit {
  public users: Array<any> = [];
  public checkedEmployeeList: Array<any> = [];
  public modalRef: BsModalRef;
  selectedEmployeeData: any = [];
  generationFormData: any;
  onBehalfValue:any = '';
  sameContentValue: any ='';
  sameContentViewFlag:boolean = false;
  selectedEmpLength = 0

  constructor(private service: PayrollInputsService, private router: Router,private modalService: BsModalService
    ,public queryService :QueryService) { }

  public ngOnInit(): void {
    this.getAllEmployeeDetails();
  }

  public getAllEmployeeDetails(): void {
    this.service.getAllEmployeeDetails().subscribe((res) => {
      this.users = res.data.results[0];
    });
  }

  public updateEmployeeSelectedLists(event: any, id: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.checkedEmployeeList.push(id);
    } else {
      this.checkedEmployeeList.forEach((value, index) => {
        if (value === id) { this.checkedEmployeeList.splice(index, 1); }
      });
    }
    console.log(this.checkedEmployeeList);
    this.service.setEmployeeListArray(this.checkedEmployeeList);
  }

  public updateAllEmployeeSelectedLists(event: any): void {
    const checked = event.target.checked;
    this.checkedEmployeeList = [];
    if (checked) {
      this.users.forEach((val) => {
        this.checkedEmployeeList.push(val.employeeMasterId);
      });
    } else {
      this.checkedEmployeeList = [];
    }
    this.service.setEmployeeListArray(this.checkedEmployeeList);
  }


  /** get selected employee data */
  getSelectedEmployee(user,event) {
    if(event.checked){
    this.selectedEmployeeData.push(user)
    this.selectedEmpLength = this.selectedEmpLength + 1
    }else{
      if(this.selectedEmployeeData.length > 0){
        this.selectedEmployeeData.forEach((element,index) => {
          if(element.employeeMasterId == user.employeeMasterId){
            let ind = index;
            this.selectedEmployeeData.splice(ind,1)
          }
        });
      }
      this.selectedEmpLength = this.selectedEmpLength - 1
    }
  }

  navigateToNRAmt() {
    localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
    this.router.navigate(['/PayrollInputs/Non-Recurring-Amount'])
  }

  navigateToNRQty() {
    localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
    this.router.navigate(['/PayrollInputs/Non-Recurring-qty'])
  }

  navigateToGarnishmentApplication(){
    localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
    this.router.navigate(['/PayrollInputs/Garnishment-Transaction'])
  }



  // ............................................Add Query....................................................
  navigateToQuery() {
    localStorage.setItem('queryListEmpData', JSON.stringify(this.selectedEmployeeData))
    this.router.navigate(['/admin-query-generation'])
  }
  smallpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  addQueryGeneration() { //post api for saving data
    let data = {
      'onBehalf': this.onBehalfValue,
      'sameContent': this.sameContentValue
    }
    localStorage.setItem('emlpoyeeSelectionData', JSON.stringify(data))

  }
  onBehalf(value) {
    this.onBehalfValue = value;

  }

  sameContent(value) {
    this.sameContentValue = value;

  }


}
