import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdhocService } from './adhoc.service';
import { AnyCnameRecord } from 'node:dns';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { DatePipe } from '@angular/common';
//import { AlertServiceService } from '../../../core/services/alert-service.service';
import { ExcelserviceService } from '../../../excel_service/excelservice.service';

@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss'],
  styles: [`
        .outofstock {
          background-color: #ddd!important;
          color: #000!important;
          font-weight: 500;
        }
        .disable1{
           background-color:#D3D3D3 !important;
          color: #000!important;
          font-weight: 500;
        }` ]
})
export class AdhocComponent implements OnInit {
  
  is_edit = true
  cycleDefifitionList: Array<any> = [];
  adhocForm : FormGroup;
  cycleNameList: Array<any> = [];  
  @ViewChild( 'adhocForm' ) form: NgForm;
  adhocCycleList: any = [];
  activeHeadList: Array<any> = [];
  summarydata: Array<any> = [];
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  date: any;
  isArrearFlag : boolean = false;
 // fromDate: any;
  //toDate: any;
  businessCycleDefinition: any;
  
  periodName: any;
  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];
  HighlightRow: any;
  HighlightRight: any;
  viewupdateButton = false;
  targetProducts:  Array<any> = [];
  userHasSelectedMandatoryFieldOnly: any;
  disabled = true;
  businessCycleDefinitionId: any;
  selctedCycleName: any;
  selectedPeriodName: any;
  adhocCycleListNew: any;
  headMasterIds: Array<any> = [];
  minStartDate: any;
  maxStartDate: any;
  editData: any;
  periodId: any;
  activeHeadListCopy: any;
  checkValids :boolean =false;
 // fromtDate: string;
 header: any[];
 excelData: any[];
  

  constructor(public adhocService : AdhocService,public toaster : ToastrService,
    public alertService : AlertServiceService,public datepipe : DatePipe,
    private excelservice: ExcelserviceService, private datePipe: DatePipe) {
      

    this.adhocForm = new FormGroup({
     
      businessCycleDefinitionId : new FormControl('',[Validators.required]),
      businessCycleId : new FormControl(''),
      periodName : new FormControl('',[Validators.required]),
      periodId : new FormControl(''),
      remark : new FormControl(''),
      arrear : new FormControl(''),
      headMasterIds : new FormControl([]),
      fromDate : new FormControl(''),
      toDate : new FormControl(''),
      cycleName : new FormControl(''),
      headNature : new FormControl(''), 
      startDate : new FormControl(''),
      endDate : new FormControl(''),
      copyFrom : new FormControl('')
      
     
     // adhocCycleName : new FormControl('')
    
    })
    this.adhocForm.setErrors({required: true});
    this.adhocForm.valueChanges.subscribe(newValue => {
    if(this.adhocForm.get('arrear').value || newValue.selectedUser?.length > 0 || this.adhocForm.get('remark').value){
        this.adhocForm.setErrors(null);
    } else {
        this.adhocForm.setErrors({required: true});
    } 
});
    
   }


  //  isTrueChange(){
  //    this.isTrue = true;
  //  }

  
  checkValid() {
    if(this.adhocForm.get('arrear').value || this.selectedUser?.length>0) {
      return false;
    } else {
      return true;
    }
  }


//   isArrear($event){
    
//     if(this.adhocForm.get('arrear').value != true){
//         this.isArrearFlag = false;
//     }else{
//         this.isArrearFlag = true;
//     }
// }

  ngOnInit(): void {
    this.getAllCycleDefinition();
    this.getAdhocCycle();
    this.getActiveHead();
    this.getSummaryData();
  }

  onSubmit(){
    //debugger
    
    this.targetProducts.forEach(element=>{
      this.headMasterIds.push(element.headMasterId)
    })
    const periodNameList = this.cycleNameList.filter(element=>element.periodId == this.adhocForm.value.periodName)
    console.log('period name list is',periodNameList[0].periodName)
    let period = this.cycleNameList.find(x=>x.periodId==this.adhocForm.get('periodName').value)
    const data = [{
      businessCycleId:period.id,
     // businessCycleId:2790,
      //businessCycleId:this.cycleNameList.find(x=>x.id==this.adhocForm.get('periodId').value),
      periodName:periodNameList[0].periodName,
      headMasterIds:this.headMasterIds,
      arrear:this.adhocForm.value.arrear,
      remark:this.adhocForm.value.remark,
    //  fromDate:this.adhocForm.value.fromDate,
    fromDate: this.datepipe.transform(this.adhocForm.value.fromDate, "dd-MMM-yyyy"),
    toDate: this.datepipe.transform(this.adhocForm.value.toDate, "dd-MMM-yyyy")
    //  toDate:this.adhocForm.value.toDate
    }]
    
    this.adhocService.saveAdhocCycle(data).subscribe((res)=>{
    
    //this.toaster.success('',"Adhoc cycle saved successfully");
    // this.alertService.sweetalertMasterSuccess('Success','Adhoc Cycle Saved Successfully');

    this.alertService.sweetalertMasterSuccess(res.status.message, "" );

    this.getSummaryData();
  this.targetProducts = [];
    this.cycleNameList = [];
    this.getAdhocCycle();
    this.getActiveHead()
    this.adhocForm.reset();
    this.editFormFlag = false;
    this.viewFormFlag = false;
    this.selectedUser = [];
    this.selectedUser2 = [];
    })
    this.headMasterIds = [];
    
  }

  
  onUpdate(){
   
    this.targetProducts.forEach(element=>{
      this.headMasterIds.push(element.headMasterId)
    })

    const periodNameList =this.cycleNameList.filter(element=>element.periodId==this.adhocForm.get('periodName').value);
    
    let period = this.cycleNameList.find(x=>x.periodId==this.adhocForm.get('periodName').value)
    const data = [{
      //businessCycleId:2790,
      businessCycleId: this.businessCycleDefinitionId,
      //businessCycleId:2796,
      periodName: this.periodName,
     // businessCycleId:period.id,
     // periodName:periodNameList[0].periodName,
      headMasterIds:this.headMasterIds,
     // arrear:this.adhocForm.value.arrear,
     arrear:this.adhocForm.controls['arrear'].value,
      //remark:this.adhocForm.value.remark,
      remark:this.adhocForm.controls['remark'].value,
      fromDate: this.datepipe.transform(this.adhocForm.value.fromDate, "dd-MMM-yyyy"),
      toDate: this.datepipe.transform(this.adhocForm.value.toDate, "dd-MMM-yyyy"),
     
     
    }]
    
      this.adhocService.updateData(data).subscribe((res)=>{
      //this.toaster.success('',"Updated successfully");
      // this.alertService.sweetalertMasterSuccess('Success','Adhoc Cycle Updated Successfully');
      this.alertService.sweetalertMasterSuccess(res.status.message, "" );
      this.adhocForm.controls['copyFrom'].enable();
      this.getSummaryData();
      this.getAdhocCycle();
      this.targetProducts = [];
      this.cycleNameList = [];
      this.adhocForm.reset();
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.getActiveHead();
    })

    this.headMasterIds = [];
    
  }


  getAllCycleDefinition(){
      this.adhocService.getAllCycleDefinition().subscribe((res)=>{
      this.cycleDefifitionList = res.data.results;
     
    })
  }


  getCycleNameById(id) {
     this.cycleNameList = [];
     this.cycleDefifitionList.forEach(ele =>{
      if(ele.id == id){
       this.selctedCycleName = ele.cycleName
      }
      
    })
     this.adhocService.getCycleNameById(id).subscribe((response)=>{
     this.cycleNameList = response.data.results;
     
     });
    
    //this.getAllCycleDefinition();
   // this.adhocForm.reset();
   this.cycleNameList = []
   this.adhocForm.controls.periodName.reset();
   this.adhocForm.controls.cycleName.reset();
   this.adhocForm.controls.startDate.reset();
   this.adhocForm.controls.endDate.reset();
  }

  getAdhocCycle(){
    this.adhocCycleListNew = [];
      this.adhocService.getAdhocCycle().subscribe((res)=>{
     this.adhocCycleList = res.data.results;
    
    // res.data.results[0].forEach(element => {
    //   this.adhocCycleList.push({
    //     label : element.periodId,
    //     value : element.periodName
    //   })
      
    // })
     

      // this.adhocCycleList = res.data.results.businessYeardefinition;
      
    })
  }

  getActiveHead(){
      this.adhocService.getActiveHead().subscribe((res)=>{
      this.activeHeadList = res.data.results;
      
      this.activeHeadListCopy = res.data.results;
    })
  }

  getSummaryData(){
      this.adhocService.getSummaryData().subscribe((res)=>{

      this.summarydata = res.data.results;
      
     
    })
  }


  //copyFrom code done
  onChangeCopyFrom(){
    this.activeHeadList = this.activeHeadListCopy;
   // const selected = this.adhocForm.get('copyFrom').value;
    let period = this.adhocCycleList.find(x=>x.periodName== this.adhocForm.get('copyFrom').value) 
  //const location =   this.summarydata.filter(x=>x.periodName == period);
  const value = period.awphgname.split(',');
  let copyHeadMaster = [];
  value.forEach(element => {
    copyHeadMaster.push({
      headId :parseInt(element)
    })
  });

 
  this.targetProducts=[];
  //this.activeHeadList = this.activeHeadListCopy;
  this.targetProducts = this.activeHeadList.filter(ar => copyHeadMaster.find(rm => rm.headId == ar.headMasterId ))
 this.activeHeadList = this.activeHeadList.filter(ar => !this.targetProducts.find(rm => rm.headMasterId == ar.headMasterId ))
// this.targetProducts.push({
//this.adhocForm.reset()

// })
  }

  formReset(){
      this.adhocForm.reset();
      this.targetProducts = [];
      this.selectedUser = [];
      this.selectedUser2 = []
      this.cycleNameList = [];
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.adhocForm.enable();  
      this.getActiveHead();
      this.adhocForm.controls.startDate.disable()
      this.adhocForm.controls.endDate.disable();
      this.adhocForm.controls.cycleName.disable();
    

  }

  onChangeCycle(periodId : any){
    //debugger;
    if(periodId == ''){
      this.adhocForm.patchValue({
        toDate : ''   
      });
    }else{
      // const index = this.cycleNameList.findIndex( o => o.periodId == periodId)
      // this.adhocForm.patchValue({
      //   toDate : this.cycleNameList[index].toDate
      // });
      let cycleName;
       let location = this.cycleNameList.find(a=>a.periodId==periodId);
       const businessId= location.businessCycleDefinition.id;
      this.cycleNameList.forEach(ele =>{
        //debugger;
       
       
        if(ele.periodId == periodId){
          this.selectedPeriodName = ele.periodName
          // this.businessCycleDefinition = ele.businessCycleDefinition.businessYearDefinition
          this.businessCycleDefinition = ele

         
        }
      })

      let i = 1
      this.adhocCycleList.forEach(element => {
        if(element.periodId == periodId && element.businessCycleDefinition.id == businessId){
         // console.log('period id is',periodId)
          i = i+1
        }
      });
      this.periodName = this.selectedPeriodName+'-A&W'+i
      // this.adhocCycleList.push({
      //   'periodName': this.periodName,
      //   'periodId':0
      // });
     
      //this.adhocCycleList = [];
      //debugger
    // console.log("this.businessCycleDefinition: " + JSON.stringify(this.businessCycleDefinition))
   this.adhocForm.controls['cycleName'].setValue(this.periodName)
   this.adhocForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
   this.adhocForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
   this.minStartDate =new Date(this.businessCycleDefinition.fromDate)
   this.maxStartDate = new Date(this.businessCycleDefinition.toDate)
   
   
   // this.adhocForm.controls['fromDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
      // this.adhocForm.controls['toDate'].setValue(new Date(this.businessCycleDefinition.toDate))
      
      

    }

  }

  RowSelected( u: any, ind ) {
    console.log( u );
    let ind1 = this.activeHeadList.findIndex( o => o.headMasterId == u.headMasterId );
    let index = this.selectedUser.findIndex( o => o.headMasterId == u.headMasterId );
    let isContain = this.selectedUser.some( o => o.headMasterId == u.headMasterId );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.activeHeadList[ind1].isHighlight = false;
      this.selectedUser.splice( index, 1 );
    } else {
      this.activeHeadList[ind1].isHighlight = true;
      this.selectedUser.push( u );
    }
    console.log( 'selected row is', u );
    console.log( 'selected user', this.selectedUser );
  }


  RowSelectedtargetProducts( u: any, i ): void {
    console.log( u );
    if ( u.disabled == true ) {

    } else {

      this.HighlightRight = i;
      let temp = this.targetProducts;
      this.targetProducts = new Array();
      let index = this.selectedUser2.findIndex( o => o.headMasterId == u.headMasterId );
      let isContain = this.selectedUser2.some( o => o.headMasterId == u.headMasterId );
      console.log( isContain, index );
      if ( isContain == true ) {
        this.selectedUser2.splice( index, 1 );
      } else {
        this.selectedUser2.push( u );
      }
      this.targetProducts = temp;

      this.targetProducts.forEach( ( element, i ) => {
        if ( i == this.HighlightRight ) {
          if ( isContain == true ) {
            element.isHighlightright = false
            element.isHighlight = false
          }
          else {
            element.isHighlightright = true
            element.isHighlight = false
          }
        }
      } );

    }
  }


  lefttablePusg(): void {
    this.selectedUser.forEach( ( element, index ) => {
      element.isHighlightright = false;
      this.targetProducts.push( element );
    } );

    this.selectedUser.forEach( element => {
      var index = this.activeHeadList.indexOf( element )
      this.selectedUser = [];
      if ( index > -1 ) {
        this.activeHeadList.splice( index, 1 );
      }
    } );

    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.adhocForm.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block' );
      this.adhocForm.setErrors( null );

    }
  }

  righttablePusg( u: any ): void {
    this.selectedUser2.forEach( element => {
      if ( element.headMasterId == null ) {
        console.log( 'head master id is not found' );
      } else {
        console.log( 'headMasterId', element.headMasterId );
      }
    } );

    this.selectedUser2.forEach( element => {
      element.isHighlight = false;
      this.activeHeadList.push( element );
    } );
    // var v = this.selectedUser;
    this.selectedUser2.forEach( element => {
      var index = this.targetProducts.indexOf( element, index )

      this.selectedUser2 = [];
      if ( index > -1 ) {
        this.targetProducts.splice( index, 1 )
      }
    } );
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.adhocForm.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block 123' );
      this.adhocForm.setErrors( null );
    }
  }

  doubleClickOnLeftTable( u: any ) {
    this.RowSelected( u, -1 );
    this.lefttablePusg();
  }
  doubleClickOnRightTable( u: AnyCnameRecord ) {
    this.RowSelectedtargetProducts( u, -1 );
    this.righttablePusg( u );

  }

  onFromDateChange(){
     
     this.adhocForm.get('toDate').patchValue((this.adhocForm.get('fromDate').value));

  }


  editAreaSet(data){
    console.log('result is',data);
    // this.activeHeadList = this.activeHeadListCopy;
   // this.editData= data;
    this.getCycleNameById(data.businessCycleDefinition.id);
    this.editFormFlag =true;
    this.viewFormFlag = false;
    this.adhocForm.enable();
    this.adhocForm.patchValue(data);


    this.businessCycleDefinitionId=data.id;
   this.periodName=data.periodName;
// this.supplimentary=data.supplimentary;
  this.periodId = data.periodId;
  
 // this.adhocForm.get['businessCycleId'].setValue(data.businessCycleId);
 this.adhocForm.controls['periodName'].patchValue(data.periodId);
 this.adhocForm.controls['cycleName'].setValue(data.periodName);
 setTimeout(() => {
  const from = this.cycleNameList.find(a=>a.periodId==data.periodId);
  this.adhocForm.controls['startDate'].patchValue(new Date(from.fromDate));
 // const to =new Date( this.cycleNameList.find(a=>a.periodId==data.periodId)[0].toDate);
  this.adhocForm.controls['endDate'].patchValue(new Date(from.toDate));
 }, 1000);
 
  this.adhocForm.controls['fromDate'].patchValue(new Date(data.fromDate));
 //this.adhocForm.controls['fromDate'].setValue(new Date(data.fromDate));
  this.adhocForm.controls['toDate'].patchValue(new Date(data.toDate));
 // this.adhocForm.controls['toDate'].setValue(new Date(data.toDate));
  this.adhocForm.controls['remark'].patchValue(data.remark);
  
 let cycleDef = this.cycleDefifitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.adhocForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }

    //copy from
   // let period = this.adhocCycleList.find(x=>x.id== data.id) 
  // let period = data;
    if(data.awphgname != null){
      const value = data.awphgname.split(',');
    let copyHeadMaster = [];
    value.forEach(element => {
      copyHeadMaster.push({
        headId :parseInt(element)
      })
    });
  
    console.log('value is',value);
    this.targetProducts=[];
    this.activeHeadList = this.activeHeadListCopy;
    this.targetProducts = this.activeHeadList.filter(ar => copyHeadMaster.find(rm => rm.headId == ar.headMasterId ))
    this.activeHeadList = this.activeHeadList.filter(ar => !this.targetProducts.find(rm => rm.headMasterId == ar.headMasterId ))
  
    }
    
     this.adhocForm.controls['businessCycleDefinitionId'].disable();
     this.adhocForm.controls['periodName'].disable();
     this.adhocForm.controls['cycleName'].disable();
     this.adhocForm.controls['startDate'].disable();
     this.adhocForm.controls['endDate'].disable();
     this.adhocForm.controls['copyFrom'].disable();
     
   //  this.adhocForm.controls['fromDate'].disable();
    // this.adhocForm.controls['toDate'].disable();
     
   // this.adhocForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
   // this.adhocForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
    // let cylcenm = this.cycleNameList.find(el => el.periodId === data.businessCycleDefinition.periodId);
    // if (cylcenm) {
    //   this.adhocForm.controls['periodName'].patchValue(cylcenm.periodId);
    // }
    
}

viewAreaSet(data){
  this.getCycleNameById(data.businessCycleDefinition.id);
    this.editFormFlag =false;
    this.viewFormFlag = true;
    this.adhocForm.disable();
    this.adhocForm.patchValue(data);
    this.adhocForm.controls['periodName'].patchValue(data.periodId);
  this.adhocForm.controls['cycleName'].setValue(data.periodName);
  setTimeout(() => {
    const from = this.cycleNameList.find(a=>a.periodId==data.periodId);
    this.adhocForm.controls['startDate'].patchValue(new Date(from.fromDate));
   // const to =new Date( this.cycleNameList.find(a=>a.periodId==data.periodId)[0].toDate);
    this.adhocForm.controls['endDate'].patchValue(new Date(from.toDate));
   }, 1000);
 // this.adhocForm.controls['startDate'].patchValue(new Date(data.fromDate));
 // this.adhocForm.controls['endDate'].patchValue(new Date(data.toDate));
  this.adhocForm.controls['fromDate'].patchValue(new Date(data.fromDate));
  this.adhocForm.controls['toDate'].patchValue(new Date(data.toDate));
  this.adhocForm.controls['remark'].patchValue(data.remark);
  
// this.adhocForm.controls.lefttablePusg.disable();
  
//  this.adhocForm.controls['headMasterIds'].disable();
 let cycleDef = this.cycleDefifitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.adhocForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }
    // let cycleNm = this.cycleNameList.find(el => el.periodId === data.businessCycleDefinition.periodId);
    // if (cycleNm) {
    //   this.adhocForm.controls['periodId'].patchValue(cycleNm.periodId);
    // }

    //copy from
   // let period = this.adhocCycleList.find(x=>x.id== data.id) 
    //const value = period.awphgname.split(',');
    let copyHeadMaster = [];
    // value.forEach(element => {
    //   copyHeadMaster.push({
    //     headId :parseInt(element)
    //   })
    // });
    if(data.awphgname != null){
      const value = data.awphgname.split(',');
    let copyHeadMaster = [];
    value.forEach(element => {
      copyHeadMaster.push({
        headId :parseInt(element)
      })
    });
   
    this.targetProducts=[];
    this.activeHeadList = this.activeHeadListCopy;
    this.targetProducts = this.activeHeadList.filter(ar => copyHeadMaster.find(rm => rm.headId == ar.headMasterId ))
    this.activeHeadList = this.activeHeadList.filter(ar => !this.targetProducts.find(rm => rm.headMasterId == ar.headMasterId ))
  }
}  

deleteData(id){
  
  this.adhocService.deleteData(id).subscribe((res)=>{
    this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    this.getAllCycleDefinition();
  },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}

  setPolicyEndDate(){}
 

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["Adhoc Cycle","From Date","To Date","Primary Cycle Definition","Primary Cycle Name","Arrears","Count of Heads","Remark"]
    //this.excelData = this.attendanceData
    this.summarydata.forEach(element => {
  
  
      let obj = {
        "Adhoc Cycle": element.periodName,
        "From Date": this.datePipe.transform(new Date(element.fromDate),'dd-MM-yyyy'),
        "To Date": this.datePipe.transform(new Date(element.toDate),'dd-MM-yyyy'),
        "Primary Cycle Definition": element.businessCycleDefinition.cycleName,
        "Primary Cycle Name": element.oldPeriodName,
        "Arrears":element.arrear?'Yes':'No',
        "Count of Heads":element.headCount,
        "Remark": element.remark,
       
  
  
      }
      this.excelData.push(obj)
    });
   
    this.excelservice.exportAsExcelFile(this.excelData, '  Adhoc Cycle','  Adhoc Cycle',this.header);
  }
}