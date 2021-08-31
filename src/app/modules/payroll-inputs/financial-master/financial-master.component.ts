import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PayrollInputsService } from '../payroll-inputs.service';
import { FinancialMasterService } from './financial-master.service';



@Component({
  selector: 'app-financial-master',
  templateUrl: './financial-master.component.html',
  styleUrls: ['./financial-master.component.scss']
})


export class FinancialMasterComponent implements OnInit {
  @Input() public data: any;

  public masterGridData: Array<any> = [];
  public recievedMasterGridData: Array<any> = [];
  public historyArrayData: Array<any> = [];
  public employeeId: any;
  public employeeDetails: EmployeeMasterDetails;

// public masterGridData1 :any;
public changeValueFlag = true;
public changePercentageFlag = true;
public closingAmountFlag = true;
public headsFlag: Array<boolean> = [];
public headField = 2;
public updationField: number = null;
public currency = '';
public frequency = '';
public updateMasterFromDate: any;
public updateMasterToDate: any;
public employeeListsArray = [];
public employeeListIndex = 0;
public modalRef: BsModalRef;
public headDescriptionName: string;
  selectedEmpData: any;
  index: number = 0;

  constructor(private service: FinancialMasterService,
              private datePipe: DatePipe,
              private modalService: BsModalService,
              private commonService: PayrollInputsService,
              private router: Router
    ) {

      if (localStorage.getItem('payrollListEmpData') != null) {
        this.selectedEmpData = JSON.parse(localStorage.getItem('payrollListEmpData'))
        localStorage.removeItem('payrollListEmpData')
        this.index = 0
      } 
    }

  public ngOnInit(): void {
    // this.employeeListsArray = this.commonService.getEmployeeListArray();
    // if (this.employeeListsArray === []) {
    //   this.router.navigate(['/payrollInputs/payroll-List']);
    // }
    this.getCurrencyDetails();
    this.getEmployeeDetails(0);
    this.summaryPage();
 }
  // ---------------------Summary ----------------------
    // Summary get Call
    public summaryPage(): void {
      this.masterGridData = [];
      this.headsFlag = [];
     // const empId = this.employeeListsArray[this.employeeListIndex];
      const empId = 1;
      this.service.getAllRecords(empId).subscribe((res) => {
            console.log('masterGridData::', res);
            this.masterGridData = res.data.results;
            this.setInitialClosingAmount();
            this.recievedMasterGridData = this.masterGridData.map((x) => Object.assign({}, x));
            this.setHeadFlagAuto();
            if (this.masterGridData[0].openingAmount === 0) {
              this.updationField = 3;
              this.setHeadFlag('Yes');
            }
            console.log('masterGridData::', this.masterGridData);
          });
    }

    public getEmployeeDetails(index): void  {
     // const id = this.employeeListsArray[index]
      const id = 1; // this.employeeId
      this.service.getEmployeeDetails(id).subscribe((res) => {
        console.log('Employee Details::', res.data.results[0]);
        this.employeeDetails = res.data.results[0][0];
      });
    }

    public getCurrencyDetails(): void  {
     // const id = this.employeeListsArray[ this.employeeListIndex]
     const id = 1;
     console.log(id);
     this.service.getCurrencyDetails(id).subscribe((res) => {
        console.log('Currency::', res.data.results);
        this.currency = res.data.results[0].currency;
        const frequencyId = res.data.results[0].businessCycleDefinitionId;
        this.getFrequencyMaster(frequencyId);
      });
    }

    public getFrequencyMaster(id): void  {
      this.service.getFrequencyMaster(id).subscribe((res) => {
        this.frequency = res.data.results[0].name;
        console.log('Frequency List', res);
      });
    }

    public setInitialClosingAmount(): void  {
      this.masterGridData.forEach((ele) => {
        ele.closingAmount = ele.openingAmount;
      });
    }
    public getUpdationField(evt): void  {
          if (evt === 1) {
            this.changeValueFlag = false;
            this.changePercentageFlag = true;
            this.closingAmountFlag = true;
          } else if (evt === 2) {
            this.changeValueFlag = true;
            this.changePercentageFlag = false;
            this.closingAmountFlag = true;
          } else  if (evt === 3) {
            this.changeValueFlag = true;
            this.changePercentageFlag = true;
            this.closingAmountFlag = false;
          } else {
            this.changeValueFlag = true;
            this.changePercentageFlag = true;
            this.closingAmountFlag = true;
          }

      }

      public copyDateFromUpdteMaster(i): void  {
        console.log(this.updateMasterFromDate);
        this.masterGridData[i].fromdate = this.updateMasterFromDate;
        this.masterGridData[i].todate = this.updateMasterToDate;
        console.log(this.updateMasterFromDate);
      }

      public onChangeValueCalculation(rowIndex): void   {
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        if (openingAmount === 0) {
          return;
        }
        const changeValue = this.masterGridData[rowIndex].changeValue;
        const closingAmount = changeValue + openingAmount;
        let changePercenatge =  (changeValue * 100) / openingAmount;
        changePercenatge = Math.fround(changePercenatge);
        this.masterGridData[rowIndex].changePercenatge = changePercenatge;
        this.masterGridData[rowIndex].closingAmount = closingAmount;

      }

      public onChangePercentageCalculation(rowIndex): void   {
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        if (openingAmount === 0) {
          return;
        }
        const changePercenatge = this.masterGridData[rowIndex].changePercenatge;
        const changeValue = (changePercenatge * openingAmount) / 100;
        const closingAmount =  openingAmount + changeValue;
        this.masterGridData[rowIndex].changeValue = changeValue;
        this.masterGridData[rowIndex].closingAmount = closingAmount;

      }

      public onChangeClosingAmountCalculation(rowIndex): void   {
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        if (openingAmount === 0) {
          return;
        }
        const closingAmount = this.masterGridData[rowIndex].closingAmount;
        const changeValue = closingAmount - openingAmount;
        const changePercenatge =  (changeValue * 100) / openingAmount;
        this.masterGridData[rowIndex].changeValue = changeValue;
        this.masterGridData[rowIndex].changePercenatge = changePercenatge;
      }

      public selectedInputHeads(): void   {
      this.headsFlag = [];
      this.headField === 1 ? this.setHeadFlag('Yes') :
      this.headField === 2 ? this.setHeadFlagAuto() : this.setHeadFlag('');
      console.log(this.masterGridData);
    }

    public setHeadFlag(isPEIRecord): void   {
      let i = 1;
      this.masterGridData.forEach((ele) => {
        if (ele.isPEIRecord === isPEIRecord) {
          ele.srNo = i++;
          this.headsFlag.push(true);
        } else {
          this.headsFlag.push(false);
        }
      });
    }

    public setHeadFlagAuto(): void   {
      this.masterGridData.forEach((ele, index) => {
        ele.srNo = index + 1;
        this.headsFlag.push(true);
      });
    }

    public submit(): void   {
      console.log(' save', this.masterGridData);
      console.log(' save2', this.recievedMasterGridData);
      const data = [];
      // const empId = this.employeeListsArray[this.employeeListIndex];
      const empId = 1;
      for (let i = 0; i < this.masterGridData.length; i++) {
        if (this.masterGridData[i].isPEIRecord === 'Yes') {
          this.masterGridData[i].fromdate = this.datePipe.transform(
            this.masterGridData[i].fromdate,
            'yyyy-MM-dd',
          );
          this.masterGridData[i].todate = this.datePipe.transform(
            this.masterGridData[i].todate,
            'yyyy-MM-dd',
          );
          // const tempDate = '2020-10-05';
          const tempDate2 = '9999-12-31';
          let changeValue = 0;
          let changePercenatge = 0;
          let closingAmount = 0;
          if (this.changeValueFlag === false) {
            if (parseInt(this.masterGridData[i].changeValue) !== this.recievedMasterGridData[i].changeValue) {
              changeValue = this.masterGridData[i].changeValue;
              // data.push(this.submitDataPush(i, data, changePercenatge, changeValue, closingAmount));
              data.push({
                changePercenatge,
                changeValue,
                employeeId: empId,
               // fromdate: tempDate,
                fromDate: this.masterGridData[i].fromdate,
                headMasterId: this.masterGridData[i].id,
                payrollAreaId: 1,
               todate: tempDate2,
                // toDate: this.masterGridData[i].todate,
                value: closingAmount,
                  });
            }
            } else if (this.changePercentageFlag === false) {
            if (parseInt(this.masterGridData[i].changePercenatge) !== this.recievedMasterGridData[i].changePercenatge) {
              changePercenatge = this.masterGridData[i].changePercenatge;
              data.push({
                changePercenatge,
                changeValue,
                employeeId: empId,
               // fromdate: tempDate,
                fromDate: this.masterGridData[i].fromdate,
                headMasterId: this.masterGridData[i].id,
                payrollAreaId: 1,
               todate: tempDate2,
                // toDate: this.masterGridData[i].todate,
                value: closingAmount,
                  });
            }
            } else {
              if (parseInt(this.masterGridData[i].closingAmount) !== this.recievedMasterGridData[i].closingAmount) {
                closingAmount = this.masterGridData[i].closingAmount;
                data.push({
                  changePercenatge,
                  changeValue,
                  employeeId: empId,
                 // fromdate: tempDate,
                  fromDate: this.masterGridData[i].fromdate,
                  headMasterId: this.masterGridData[i].id,
                  payrollAreaId: 1,
                 todate: tempDate2,
                  // toDate: this.masterGridData[i].todate,
                  value: closingAmount,
                    });
              }
            }

        }

    }

      console.log(data);
      this.service.postfinancialMaster(data).subscribe((res) => {
    console.log(res);
    this.summaryPage();
    });

    }

    public submitDataPush(i, data, changePercenatge, changeValue, closingAmount): void {
      data = {
      changePercenatge,
      changeValue,
      employeeId: 1,
     // fromdate: tempDate,
      fromDate: this.masterGridData[i].fromdate,
      headMasterId: this.masterGridData[i].id,
      payrollAreaId: 1,
     // todate: tempDate2,
      toDate: this.masterGridData[i].todate,
      value: closingAmount,
        };
      console.log(data);
      return data;
    }

    public viewHistory(template1: TemplateRef<any>, id: number, headname: string): void {
      this.modalRef = this.modalService.show(
        template1,
        Object.assign({}, { class: 'gray modal-md' }),
      );
      const empId = this.employeeDetails.employeeMasterId;
      this.headDescriptionName =  headname;
      this.service.getfinancialmasterHeadHistory(empId, id).subscribe((res) => {
        console.log(res);
        this.historyArrayData = res.data.results;
      });

    }

    saveAndNext() {
      this.employeeListIndex = this.employeeListIndex + 1;
      const empId = this.employeeListsArray[this.employeeListIndex];
      this.getEmployeeDetails(empId);
      this.summaryPage();
    }

  }

export class EmployeeMasterDetails {
    public employeeMasterId: number;
    public fullName: string;
    public value: number;
    public designation1Description: string;
    public employeeCode: number;
    public joiningDate: string;
    public gradeDescription: string;
    public description: string;
    constructor(obj?: any) {
      Object.assign(this, obj);
    }
  }
