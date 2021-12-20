import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LeaveHeadCreationService } from '../leave-head-creation.service';
import {SaveLeaveAttributeCreation} from '../../model/business-cycle-model';
import { SortEvent } from 'primeng/api';
import { element } from 'protractor';

@Component({
  selector: 'app-lms-leave-attribute-creation',
  templateUrl: './lms-leave-attribute-creation.component.html',
  styleUrls: ['./lms-leave-attribute-creation.component.scss']
})
export class LmsLeaveAttributeCreationComponent implements OnInit {
  lmsAttributeMasterId: number = 0;
  ResponseList: any;
  Data: Array<any> =[];
  valueData: Array<any> =[];

  constructor(private formBuilder:FormBuilder,private modalService : BsModalService,private leaveAttributeService:LeaveHeadCreationService,
    private alertService : AlertServiceService , private addLeaveAttributeCreationService : LeaveHeadCreationService) { }

  LeaveAttributeCreationForm : FormGroup;
  hidevalue :boolean = false;
  isView : boolean =false;
  viewCancelButton: boolean = false;
  viewUpdateButton: boolean = false;
  attributeList : Array<any> = [];
  optionValue : Array<any> = [];
  lmsAttributeOptionId : Array<any>= [];
  modalRef : BsModalRef;
  optionId : number = 0;
  LeaveAttributeCreationSummaryList : Array<any> = [];
  AttributeCreationList : Array<any> = [];
  disabled: boolean = true;
  lmsAttributeOptionIdForDeleteArray : Array<any> =[];
    
  ngOnInit(): void {

    this.attributeList = [
    {label : 'List',value: 'List'},
    {label : 'Formula',value: 'Formula'},
    {label : 'Schema',value: 'Schema'},
    {label : 'Source Destination Matrix (SDM)',value: 'Source Destination Matrix (SDM)'},
    {label : 'Workflow',value: 'Workflow'},
    {label : 'Stored Procedure (SP)',value: 'Stored Procedure (SP)'},
    {label : 'All Employee Input (AEI)',value: 'All Employee Input (AEI)'},
    {label : 'Per Employee Input (PEI)',value: 'Per Employee Input (PEI)'},
    {label : 'All Employee Input Time (AEIT)',value: 'All Employee Input Time (AEIT)'},
    {label : 'Per Employee Input Time (PEIT)',value: 'Per Employee Input Time (PEIT)'},
    {label : 'Range Value Per Instance',value: 'Range Value Per Instance'},
    {label : 'Range Value Per Period',value: 'Range Value Per Period'},
    {label : 'Range Value No. of Instances Per Period ',value: 'Range Value No. of Instances Per Period'},
    {label : 'Range Value Per Instance SDM',value: 'Range Value Per Instance SDM'},
    {label : 'Range Value Per Period SDM',value: 'Range Value Per Period SDM'},
    {label : 'Range Value No. of Instances Per Period SDM',value: 'Range Value No. of Instances Per Period SDM'}

     
  ];
    this.LeaveAttributeCreationForm = this.formBuilder.group({
      code : new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),
      lmsAttributeNature : new FormControl('',Validators.required),
      pfFormArray : new FormArray( [] ),
      
    });

    this.getAllLeaveAttributeCreation();
  }

  onChangeNature(event):void{
    if(event.target.value =='List'){
    this.addRow(0);
    this.hidevalue = true;
    this.isView = true;
    }
    else{
      this.LeaveAttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
      this.hidevalue = false;
      this.isView = false;
    }
  }

  get f() { return this.LeaveAttributeCreationForm.controls; }
  get pfArray() { return this.f.pfFormArray as FormArray; }

 addRow(i? :number,){
  this.pfArray.insert(this.pfArray.length,this.formBuilder.group({
  optionValue : ['',Validators.required],
  lmsAttributeMasterId:[0],
  lmsAttributeOptionId:[0]

}));
console.log(this.pfArray);
  }


  addRowEdit(i? :number,lmsAttId? :number,lmsAttOptionId? :number,optionValue?:any){
    this.pfArray.insert(this.pfArray.length,this.formBuilder.group({
    optionValue :optionValue,
    lmsAttributeMasterId:lmsAttId,
    lmsAttributeOptionId:lmsAttOptionId
  
  }));
  console.log(this.pfArray);
    }

  ResetLeaveAttributeCreation():void{
    this.LeaveAttributeCreationForm.reset();
    this.LeaveAttributeCreationForm.patchValue({
      lmsAttributeNature: ''
    });
    //this.isView = false;
    this.hidevalue = false;
    this.LeaveAttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
  }

  UploadModal1(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,Object.assign({},{ class : 'gray modal-md'})
    );
  }

  clickedOnYesDeleteRow( ){
this.deleteRow(this.optionId);

  }
  
  deleteRowByIndex(id : number){
    debugger
    this.optionId = id;
    let arrayData = this.pfArray.getRawValue();
    //this.lmsAttributeOptionIdForDelete = arrayData[this.optionId].lmsAttributeOptionId;
    this.lmsAttributeOptionIdForDeleteArray.push(arrayData[this.optionId].lmsAttributeOptionId);
    
  }

  deleteRow(j : number){
    this.pfArray.removeAt(j);
    this.LeaveAttributeCreationForm.getRawValue().pfFormArray;
    //console.log('After delete row',this.LeaveAttributeCreationForm.getRawValue().pfFormArray);
  }

  getAllLeaveAttributeCreation():void{
    this.LeaveAttributeCreationSummaryList = [];
    let other = [];
    
    this.AttributeCreationList = [];
    this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe((res:any) =>{
   
let data= res.data.results[0];
this.ResponseList = res.data.results[0];
this.Data = res.data.results[0];

data.forEach( element => {

  let value: string = '';
  let lmsAttributeOptionId ; 
  //let lmsAttributeOptionId:number=element.lmsAttributeOptionResponseDTOList.lmsAttributeOptionId;
  if(element.lmsAttributeOptionResponseDTOList!=null){
  for ( let i = 0; i < element.lmsAttributeOptionResponseDTOList.length; i++ ) {
    this.Data.push({value :element.lmsAttributeOptionResponseDTOList[i].optionValue,
      lmsAttributeOptionId:element.lmsAttributeOptionResponseDTOList[i].lmsAttributeOptionId
    });

    if ( i == 0 ) {
      value = element.lmsAttributeOptionResponseDTOList[i].optionValue;
     lmsAttributeOptionId=element.lmsAttributeOptionResponseDTOList[i].lmsAttributeOptionId;
    
    } else {
      value = value + ', ' + element.lmsAttributeOptionResponseDTOList[i].optionValue;
      lmsAttributeOptionId = lmsAttributeOptionId + ', ' + element.lmsAttributeOptionResponseDTOList[i].lmsAttributeOptionId;
    }
  }
  }

  let label = '';
  if ( element.lmsAttributeNature !== null ) {
    let ind = this.attributeList.findIndex( o => o.value == element.lmsAttributeNature.trim() );
    if ( ind != -1 ) {
      label = this.attributeList[ind].label;
    } else {
      label = '';
    }
  }

  let obj = {
    lmsAttributeMasterId: element.lmsAttributeMasterId,
    code: element.code,
    attributeNatureLongForm: label,
    lmsAttributeNature: element.lmsAttributeNature,
    numberOfOption: element.numberOfOption,
    description: element.description,
    optionValue: value,
    lmsAttributeOptionId:lmsAttributeOptionId,
  }
  this.LeaveAttributeCreationSummaryList.push( obj );
} );

},
  ( error )=> {
    this.alertService.sweetalertError( error ["error"]["status"]["messsage"] );
  });
}


AddLeaveAttributeCreation():void{ 
  if ( this.viewUpdateButton == false ){
const addLeaveAttributeCreation : SaveLeaveAttributeCreation = Object.assign({},this.LeaveAttributeCreationForm.value);
let addLeaveAttributeCreation1=this.LeaveAttributeCreationForm.getRawValue();

addLeaveAttributeCreation1.lmsAttributeOptionRequestDTOList=this.LeaveAttributeCreationForm.getRawValue().pfFormArray;
addLeaveAttributeCreation1.lmsAttributeOptionRequestDTOList.forEach(element => {
  element.lmsAttributeOptionId=0;
});
//console.log('pfArray Values',this.LeaveAttributeCreationForm.getRawValue().pfFormArray);
 delete addLeaveAttributeCreation1.pfFormArray;
 //console.log('insert value',addLeaveAttributeCreation1)
  this.addLeaveAttributeCreationService.AddLeaveAttributeCreation(addLeaveAttributeCreation1).subscribe((res :any)=>{
  this.alertService.sweetalertMasterSuccess(res.status.messsage,'');
  this.getAllLeaveAttributeCreation();
  //this.ResetLeaveAttributeCreation();
  this.CancelLeaveAttributeCreation();
  },
  ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
      });
      
}
else{
if(this.lmsAttributeOptionIdForDeleteArray != null){
  for(let i=0; i < this.lmsAttributeOptionIdForDeleteArray.length;i++){
let lmsAttributeOptionIdForDelete = this.lmsAttributeOptionIdForDeleteArray[i];
this.leaveAttributeService.DeleteAttributeLeaveCreation(lmsAttributeOptionIdForDelete).subscribe(res =>{
  //this.lmsAttributeOptionIdForDelete = 0 ;
  console.log(res);
});
  }
  this.lmsAttributeOptionIdForDeleteArray= [];
}
  let array = [];
  let lmsAttributeOptionRequestDTOList = [];
  //console.log( 'add update logic here' );
  const addAttributeCreation: SaveLeaveAttributeCreation = Object.assign( {} );
  let addLeaveAttributeCreation1=this.LeaveAttributeCreationForm.getRawValue();
  addLeaveAttributeCreation1.lmsAttributeOptionRequestDTOList=this.LeaveAttributeCreationForm.getRawValue().pfFormArray;
  //console.log('pfArray values', addLeaveAttributeCreation1.pfFormArray);
  addLeaveAttributeCreation1.lmsAttributeOptionRequestDTOList= this.LeaveAttributeCreationForm.getRawValue().pfFormArray;
   delete addLeaveAttributeCreation1.pfFormArray;
  
  //console.log('Put Data',addLeaveAttributeCreation1);
  addLeaveAttributeCreation1.lmsAttributeMasterId=this.lmsAttributeMasterId;
  this.addLeaveAttributeCreationService.UpdateLeaveAttributeCreation( addLeaveAttributeCreation1 ).subscribe( ( res: any ) => {

    this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    this.getAllLeaveAttributeCreation();
    this.hidevalue = true;
    this.CancelLeaveAttributeCreation();
  });
}
}

addRowWithData( optionValue: string ) {
  this.pfArray.push( this.formBuilder.group( {

    optionValue: [optionValue, Validators.required],

  } ) );
}


addRowWithOptionValueData( optionValue: string,lmsAttributeOptionId: string ) {
  
    this.valueData.push([{optionValue},{lmsAttributeOptionId}]);   
}

editLeaveAttributeCreation( lmsAttributeMasterId : any){
  this.lmsAttributeMasterId=lmsAttributeMasterId
  window.scrollTo( 0, 0 );
  // this.viewUpdateButton = true;
  // this.LeaveAttributeCreationForm.disable();

  this.LeaveAttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
    this.isView = true;
    this.viewCancelButton = true;
    this.disabled = false;
    this.viewUpdateButton = true;
    this.hidevalue = true;
    this.lmsAttributeMasterId = lmsAttributeMasterId;
    let index = this.LeaveAttributeCreationSummaryList.findIndex( o => o.lmsAttributeMasterId == lmsAttributeMasterId );


    let data1 = this.Data.find(x=>x.lmsAttributeMasterId==lmsAttributeMasterId)
    data1.lmsAttributeOptionResponseDTOList.forEach(ele=>{
      
      this.addRowEdit(0,ele.lmsAttributeMasterId,ele.lmsAttributeOptionId,ele.optionValue);
    });
    
    this.LeaveAttributeCreationForm.patchValue( { code: this.LeaveAttributeCreationSummaryList[index].code } );
    this.LeaveAttributeCreationForm.patchValue( { description: this.LeaveAttributeCreationSummaryList[index].description } );
    this.LeaveAttributeCreationForm.patchValue( { lmsAttributeNature: this.LeaveAttributeCreationSummaryList[index].attributeNatureLongForm } );  
    this.LeaveAttributeCreationForm.get( 'lmsAttributeNature' ).disable();

}

GetAttributeCreationByIdDisable(id) : void{
window.scrollTo( 0, 0 );
this.LeaveAttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
this.disabled = false;
this.viewCancelButton = true;
this.hidevalue = false;
let index = this.LeaveAttributeCreationSummaryList.findIndex( o => o.lmsAttributeMasterId == id );

this.LeaveAttributeCreationForm.patchValue( { code: this.LeaveAttributeCreationSummaryList[index].code } );
this.LeaveAttributeCreationForm.patchValue( { description: this.LeaveAttributeCreationSummaryList[index].description } );
this.LeaveAttributeCreationForm.patchValue( { lmsAttributeNature: this.LeaveAttributeCreationSummaryList[index].attributeNatureLongForm } );
if ( this.LeaveAttributeCreationSummaryList[index].attributeNatureLongForm == 'List' ) {
  this.hidevalue = true;
  this.isView = false;
}

if ( this.LeaveAttributeCreationSummaryList[index].optionValue.length > 0 ) {
  let split = this.LeaveAttributeCreationSummaryList[index].optionValue.split( ',' );
  //console.log( split );
  for ( let i = 0; i < split.length; i++ ) {
    this.addRowWithData( split[i] );
  }
}
this.LeaveAttributeCreationForm.disable();
}

CancelLeaveAttributeCreation(): void {
  this.LeaveAttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
  this.isView = false;
  this.viewUpdateButton = false;
  this.LeaveAttributeCreationForm.enable();
  //this.summaryHtmlDataList = [];
  this.disabled = true;
  this.hidevalue = false;
  this.LeaveAttributeCreationForm.reset();
  this.viewCancelButton = false;
  this.viewUpdateButton = false;
  this.LeaveAttributeCreationForm.patchValue( {
    lmsAttributeNature: ''
  } );
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
