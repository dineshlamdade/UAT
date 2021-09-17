import { Component, OnInit , TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GarnishmentService } from '../garnishment-master/garnishment.service';
import { PayrollInputsService } from '../payroll-inputs.service';
@Component({
  selector: 'app-garnishment-transaction',
  templateUrl: './garnishment-transaction.component.html',
  styleUrls: ['./garnishment-transaction.component.scss']
})
export class GarnishmentTransactionComponent implements OnInit {
  public modalRef: BsModalRef;
  payrollListEmpData: any;
  employeeData: any;
  selectedEmployeeMasterId: number;
  employeeFinDetailsData: any;
  
  constructor(private modalService: BsModalService,private payrollservice: PayrollInputsService,
    private garnishmentservice: GarnishmentService){
    if (localStorage.getItem('payrollListEmpData') != null) {
			this.payrollListEmpData = JSON.parse(localStorage.getItem('payrollListEmpData'))
			localStorage.removeItem('payrollListEmpData')
			this.getAllEmployeeDetails();
      this.getSelectedEmployeeCode(this.payrollListEmpData[0].employeeMasterId)
		}
  }

  /** Get all  Employee data */
	getAllEmployeeDetails(): void {
		this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
			this.employeeData = res.data.results[0];
		});
	}

  /** Get Selected Employee master Id */
	getSelectedEmployeeCode(value) {
		this.selectedEmployeeMasterId = parseInt(value)
		
    this.garnishmentservice.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
				res => {
					this.employeeFinDetailsData = res.data.results[0][0];
				}
			)
	}
   
  schedulepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  };
  public UploadModal(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  ngOnInit(): void {
   
  }

}
