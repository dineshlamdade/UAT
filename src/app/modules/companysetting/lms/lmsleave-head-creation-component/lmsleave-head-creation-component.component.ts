import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExcelserviceService } from './../../../../core/services/excelservice.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { LeaveHeadCreationService } from '../leave-head-creation.service';
import { SortEvent } from 'primeng/api';

export class User1 {
 code : string;
 description: string;
 shortName: string;
 displayName: string;
 nature: string;
 type: string;
}
@Component({
  selector: 'app-lmsleave-head-creation-component',
  templateUrl: './lmsleave-head-creation-component.component.html',
  styleUrls: ['./lmsleave-head-creation-component.component.scss']
})
export class LMSLeaveHeadCreationComponentComponent implements OnInit {

  users1: User1[];
  public codeInvalid : boolean = false;
  NatureList :Array<any>=[];
  TypeList :Array<any>=[];
  viewCancelButton: boolean = false;
  LeaveHeadCreationList : Array<any> = [];
  disabled: boolean = true;
  header: any[];
  excelData: any[];
  LeaveHeadCreationForm : FormGroup;
  constructor( private formBuilder : FormBuilder,private leaveHeadCreationService :LeaveHeadCreationService,
    private alertService:AlertServiceService, private excelservice:ExcelserviceService) { }

  ngOnInit(): void {
    this.NatureList = [{label: 'Paid', value: 'Paid'},{label: 'Unpaid', value: 'Unpaid'}];
    this.TypeList = [
      {label:'Privilege Leave',value:'Privilege Leave'},
      {label:'Casual Leave',value:'Casual Leave'},
      {label:'Sick Leave',value:'Sick Leave'},     
      {label:'Marriage Leave',value:'Marriage Leave'},
      {label:'Paternity Leave',value:'Paternity Leave'},
      {label:'Maternity Leave',value:'Maternity Leave'},
      {label:'Bereavement Leave',value:'Bereavement Leave'},
      {label:'Compensatory Off',value:'Compensatory Off'},
      {label:'Leave Without Pay',value:'Leave Without Pay'},
      {label:'Other',value:'Other'},
    ];

    this.LeaveHeadCreationForm = this.formBuilder.group({
      code : new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),
      shortName : new FormControl('',Validators.required), 
      displayName : new FormControl('',Validators.required),
      nature : new FormControl('',Validators.required),
      type : new FormControl('',Validators.required)
    })
    this.getAllLeaveHeadCreation();
    
  }

  getAllLeaveHeadCreation() : void {
    this.LeaveHeadCreationList = [];
    let other = [];
    let paid =[];
    let unpaid=[];
    this.leaveHeadCreationService.getAllLeaveHeadCreation().subscribe(res =>{
for(let i = 0; i < res.data.results.length; i ++ ){
  other.push(res.data.results[i]);
}
this.LeaveHeadCreationList=other;
    },
    ( error )=> {
      this.alertService.sweetalertError( error ["error"]["ststus"]["messsage"] );
    });
  }

  addLeaveHeadCreation() :void{
const addLeaveHeadCreation :User1 = Object.assign({},this.LeaveHeadCreationForm.value);
this.leaveHeadCreationService.AddLeaveHeadCreation(addLeaveHeadCreation).subscribe( (res : any) =>{
this.alertService.sweetalertMasterSuccess(res.status.messsage,'');
//console.log(res.status.messsage);
this.getAllLeaveHeadCreation();
this.CancelLeaveHeadCreation();
},
  ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
      }
)
  }
  onChangeEvent(event : any):void{
this.LeaveHeadCreationForm.patchValue({shortName : event.target.value});
  }

  CancelLeaveHeadCreation(): void {
    this.LeaveHeadCreationForm.enable();
    this.disabled = true;
    this.LeaveHeadCreationForm.reset();
    this.viewCancelButton = false;
    this.LeaveHeadCreationForm.patchValue( {
      nature: '',
      type: '',
    } );
  }
  
  ResetLeaveHeadCreation():void{
    this.LeaveHeadCreationForm.reset();
    this.LeaveHeadCreationForm.patchValue( {
      nature: '',
      type: '',
    } );
  }


  GetLeaveHeadCreationbyIdDisable( leaveHeadCreationList ): void {
    window.scrollTo( 0, 0 );
    this.viewCancelButton = true;
    this.LeaveHeadCreationForm.patchValue(leaveHeadCreationList);
    this.LeaveHeadCreationForm.disable();
  } 


//excel
exportAsXLSX(): void {
  this.excelData = [];
  this.header = []
  this.header =["Code","Discription","Short Name","Display Name","Nature","Type"];
  this.excelData=[];
  if(this.LeaveHeadCreationList.length>0){
  this.LeaveHeadCreationList.forEach(element => {
    let obj = {
      "Code":element.code,
      "Discription":element.description,
      "Short Name": element.shortName,
      "Display Name":element.displayName,
      "Nature":element.nature,
      "Type":element.type,
   
    }
    this.excelData.push(obj)
  });
  console.log('this.excelData::', this.excelData);
} 
  this.excelservice.exportAsExcelFile(this.excelData, 'Leave Head ','Leave Head',this.header);
      
}

//sort
customSort(event: SortEvent) {
  event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
  });
}


}
