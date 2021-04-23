import { DatePipe } from '@angular/common';
import { Conditional } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public inputRecoadData: Array<any> = [];
  public employeeId:any;
  public payrollAreaId:any;
  public headMasterId:any;
  public value:any;
  public changeValue:any;
  public changePercenatge:any;
  public fromDate:any;
  public toDate:any;

  public masterService: MasterService;
//public masterGridData1 :any;
public isDisabled: boolean;
public canEdit: boolean;
public changeValueFlag: boolean = true;
public changePercentageFlag: boolean = true;
public closingAmountFlag: boolean = true;
public headsFlag: Array<boolean> = [];
public headField = 2;
public updationField: number = null;

  
  constructor(private service: FinancialMasterService,
    private datePipe: DatePipe,) {
    this.isDisabled = true;
   }

  ngOnInit() {
 this.summaryPage();
 }
  // ---------------------Summary ----------------------
    // Summary get Call
    summaryPage() {
      this.masterGridData = [];
      this.headsFlag =[];
          this.service.getAllRecords().subscribe((res) => {
            console.log('masterGridData::', res);
            this.masterGridData = res.data.results;
            this.inputRecoadData = res.data.results;
            this.setInitialClosingAmount();
            this.recievedMasterGridData = this.masterGridData.map(x => Object.assign({}, x));
            this.setHeadFlagAuto();
            if(this.masterGridData[0].openingAmount === 0){
              this.updationField = 3;
             // this.setHeadFlag('Yes');
            }
            console.log('masterGridData::', this.masterGridData);
            console.log('masterGridData::', res);
          })  
    }

    setInitialClosingAmount(){
      this.masterGridData.forEach((ele)=>{
        ele.closingAmount = ele.openingAmount;
      })
    }
    getUpdationField(evt) {
      
          if(evt === 1){
            this.changeValueFlag=false;
            this.changePercentageFlag = true;
            this.closingAmountFlag = true;
          } else if(evt ===2){
            this.changeValueFlag=true;
            this.changePercentageFlag = false;
            this.closingAmountFlag = true;
          }
          else  if(evt === 3){
            this.changeValueFlag=true;
            this.changePercentageFlag = true;
            this.closingAmountFlag = false;
          } else {
            this.changeValueFlag=true;
            this.changePercentageFlag = true;
            this.closingAmountFlag = true;
          }

      }

      onChangeValueCalculation(rowIndex) {
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        if(openingAmount === 0) {
          return;
        }
        const changeValue = this.masterGridData[rowIndex].changeValue;
        const closingAmount = changeValue + openingAmount;
        const changePercenatge =  (changeValue*100)/openingAmount;
        this.masterGridData[rowIndex].changePercenatge = changePercenatge;
        this.masterGridData[rowIndex].closingAmount = closingAmount;

      }

      onChangePercentageCalculation(rowIndex) {
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        if(openingAmount === 0) {
          return;
        }
        const changePercenatge = this.masterGridData[rowIndex].changePercenatge;
        const changeValue = (changePercenatge*openingAmount)/100;
        const closingAmount =  openingAmount + changeValue;
        this.masterGridData[rowIndex].changeValue = changeValue;
        this.masterGridData[rowIndex].closingAmount = closingAmount;

      }

      onChangeClosingAmountCalculation(rowIndex) {
        let openingAmount = this.masterGridData[rowIndex].openingAmount;
        if(openingAmount === 0) {
          return;
        }
        const closingAmount = this.masterGridData[rowIndex].closingAmount;
        const changeValue = closingAmount - openingAmount;
        const changePercenatge =  (changeValue*100)/openingAmount;
        this.masterGridData[rowIndex].changeValue = changeValue;
        this.masterGridData[rowIndex].changePercenatge = changePercenatge;
      }

    selectedInputHeads(){
      this.headsFlag = [];
      this.headField === 1? this.setHeadFlag('Yes'):
      this.headField === 2? this.setHeadFlagAuto():this.setHeadFlag('');
      console.log(this.masterGridData)
    }

    setHeadFlag(isPEIRecord){
      let i=1;
      this.masterGridData.forEach((ele)=>{
        if(ele.isPEIRecord === isPEIRecord){
          ele.srNo = i++;
          this.headsFlag.push(true)
        }
        else{
          this.headsFlag.push(false)
        }
      })
    }

    setHeadFlagAuto(){
      this.masterGridData.forEach((ele, index) => {
        ele.srNo = index+1;
        this.headsFlag.push(true)
      })
    }

    submit() {
      console.log(" save", this.masterGridData)
      console.log(" save2", this.recievedMasterGridData)
      
      const data =[];

      for(let i =0; i< this.masterGridData.length; i++){
        if(this.masterGridData[i].isPEIRecord ==='Yes') {
          this.masterGridData[i].fromDate = this.datePipe.transform(
            this.masterGridData[i].fromDate,
            'dd-MM-yyyy',
          );
          this.masterGridData[i].toDate = this.datePipe.transform(
            this.masterGridData[i].toDate,
            'dd-MM-yyyy',
          );
          console.log(this.masterGridData[i].toDate)
          // let closingAmount = 0;
          // let changePercenatge = 0;
          // let changeValue = 0;
          let tempDate= "2020-10-05"
          let tempDate2 = "9999-12-31"
          if(this.changeValueFlag === false){
            if(this.masterGridData[i].changeValue != this.recievedMasterGridData[i].changeValue){
              let closingAmount = 0;
              let changePercenatge = 0;
              data.push({
                employeeId: 1,
                payrollAreaId:1,
                headMasterId: this.masterGridData[i].id,
                value:closingAmount,
                // value:9000,
                changeValue:this.masterGridData[i].changeValue,
                changePercenatge:changePercenatge,
                // fromDate: this.masterGridData[i].fromDate,
                fromDate: tempDate,
                // toDate: this.masterGridData[i].toDate
                toDate: tempDate2
              })
            }
            } else if(this.changePercentageFlag === false){
              if(this.masterGridData[i].changePercenatge != this.recievedMasterGridData[i].changePercenatge){
                let closingAmount = 0;
                let changeValue = 0;
                data.push({
                  employeeId: 1,
                  payrollAreaId:1,
                  headMasterId: this.masterGridData[i].id,
                  value:closingAmount,
                  // value:9000,
                  changeValue: changeValue,
                  changePercenatge:this.masterGridData[i].changePercenatge,
                  // fromDate: this.masterGridData[i].fromDate,
                fromDate: tempDate,
                // toDate: this.masterGridData[i].toDate
                toDate: tempDate2
                })
              }
              } else{
                if(this.masterGridData[i].closingAmount != this.recievedMasterGridData[i].closingAmount){
                  let changePercenatge = 0;
                  let changeValue = 0;
                  data.push({
                    employeeId: 1,
                    payrollAreaId:1,
                    headMasterId: this.masterGridData[i].id,
                    value:this.masterGridData[i].closingAmount,
                    // value:9000,
                    changeValue: changeValue,
                    changePercenatge: changePercenatge,
                    fromDate: tempDate,
                    // fromDate: this.masterGridData[i].fromDate,
                    // toDate: this.masterGridData[i].toDate
                    toDate: tempDate2
                  })
                }
              }


            
          }
        }
      console.log(data);
      this.service.postfinancialMaster(data).subscribe(res =>{
      console.log(res);
      this.summaryPage();
      })
    }
  }
  
  
  

  class MasterService {
    public financialMasterId = 0;
    public employeeMasterId = 1;
    public payrollArea:"string";
    public headType: 'string';
    public dueDate: Date;
    public closingAmount:number;
    public changeValue: number;
    public dateOfPayment: Date;
    public changePercenatge: number;
    public uom: 'string';
    public isPEIRecord: 'string';
    public id=0;
    public headDescription: 'string';
    public remark: 'string';
    public openingAmount: number;
    constructor(obj?: any) {
      Object.assign(this, obj);
    }
  }
