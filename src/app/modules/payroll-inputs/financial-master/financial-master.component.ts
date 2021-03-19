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

  
  constructor(private service: FinancialMasterService,) {
    this.isDisabled = true;
   }

  ngOnInit() {
 this.summaryPage();
 }
  // ---------------------Summary ----------------------
    // Summary get Call
    summaryPage() {
      this.masterGridData = [];
          this.service.getAllRecords().subscribe((res) => {
            console.log('masterGridData::', res);
            this.masterGridData = res.data.results;
            this.inputRecoadData = res.data.results;
      })  
    }

    updationField(evt) {
      
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

      changeValueCalculation(rowIndex) {
        console.log('sdsds')
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        const changeValue = this.masterGridData[rowIndex].changeValue;
        let changePercentage =  openingAmount/changeValue;
        console.log(changePercentage); 
        this.masterGridData[rowIndex].changePercentage = changePercentage;

      }

      changePercentageCalculation(rowIndex) {
        const openingAmount = this.masterGridData[rowIndex].openingAmount;
        const changePercenatge = this.masterGridData[rowIndex].changePercenatge;
        const changeAmount =  openingAmount /changePercenatge;
        console.log(changeAmount); 

      }

      updationFieldCalculation(rowIndex) {
        // const changeAmount ;
        // const changePercentage;
        // const closingAmount;
      }

    selectedInputHeads(evt:any){
      console.log(evt)
      // for(let i =0; i< this.inputRecoadData.length; i++){
      //   if(this.inputRecoadData[i].isPEIRecord){
      //     if(this.inputRecoadData[i].isPEIRecord === evt){
      //       console.log(i)
      //       this.isDisabled = false;
      //       this.masterGridData.push(this.inputRecoadData[i]);
      //     }
      //   }
      // }
      // if(evt ==='all'){
      //   this.masterGridData = this.inputRecoadData;
      // }
      console.log(evt);
      // if(evt==='yes'){
      //   console.log(this.abc)
      //   this.masterGridData = this.abc.find((o) =>{ o.isPEIRecord === "Yes"})
      //   console.log(this.masterGridData)
      // }
      // else{
      //   this.masterGridData= this.abc;
      // }
    
      // if (evt == 'all') {
      //   this.isDisabled = true;
      //   this.masterGridData = this.abc;
      // } else {
      //   const dataValues = this.data;
      //   this.isDisabled = false;
      //   this.canEdit = dataValues.canEdit;
      // }

    }

    submit() {
      console.log(" save", this.masterGridData)
      const data =[];
      for(let i =0; i< this.masterGridData.length; i++){

        if(this.masterGridData[i].isPEIRecord ==='Yes') {
          data.push({
            employeeId: 1,
            payrollAreaId:1,
            headMasterId: this.masterGridData[i].id,
            value:this.masterGridData[i].closingAmount,
            // value:9000,
            changeValue:this.masterGridData[i].changeValue,
            changePercenatge:this.masterGridData[i].changePercenatge,
            fromDate: "2020-05-01",
            toDate: "9999-12-31"
          })
        }
        }
      console.log(data);
      this.service.postfinancialMaster(data).subscribe(res =>{
      console.log(res);
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
