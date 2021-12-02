import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
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

  constructor(private service: PayrollInputsService, private router: Router,private modalService: BsModalService,
    private alertService : AlertServiceService
    ,public queryService :QueryService) { 
      localStorage.clear()
    }

  public ngOnInit(): void {
    this.getAllEmployeeDetails();
  }

  public getAllEmployeeDetails(): void {
    // this.service.getAllEmployeeDetails().subscribe((res) => {
    //   this.users = res.data.results[0];
    // });

    this.service.getEmployeeList().subscribe(res =>{
      this.users = res.data.results[0];
    })
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
  getSelectedEmployee(user) {
    this.selectedEmployeeData.push(user)
  }

  navigateToNRAmt() {
    if(this.selectedEmployeeData.length > 0){
      localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
      this.router.navigate(['/PayrollInputs/Non-Recurring-Amount'])
    }else{
      this.router.navigate(['/PayrollInputs/Non-Recurring-Amount'])
    }
    
  }

  navigateToNRQty() {
    if(this.selectedEmployeeData.length > 0){
      localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
      this.router.navigate(['/PayrollInputs/Non-Recurring-qty'])
    }else{
      this.router.navigate(['/PayrollInputs/Non-Recurring-qty'])
    }
    
  }

  navigateToGarnishmentApplication(){
    if(this.selectedEmployeeData.length > 0){
      localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
      this.router.navigate(['/PayrollInputs/Garnishment-Transaction'])
    }else{
      this.router.navigate(['/PayrollInputs/Garnishment-Transaction']) 
    }
  }


  navigateToFinancialMaster(){
    if(this.selectedEmployeeData.length > 0){
      localStorage.setItem('payrollListEmpData', JSON.stringify(this.selectedEmployeeData))
      this.router.navigate(['/PayrollInputs/Financial-Master'])
    }else{
      this.alertService.sweetalertWarning('Please select employee first')
    }
  }


  // ............................................Add Query....................................................
  navigateToQuery() {
    if(this.selectedEmployeeData.length > 0){
      localStorage.setItem('queryListEmpData', JSON.stringify(this.selectedEmployeeData))
      this.router.navigate(['/admin-query-generation'])
    }else{
      this.alertService.sweetalertWarning('Please select employee first')
    }
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
