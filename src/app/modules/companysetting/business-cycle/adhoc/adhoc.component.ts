import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdhocService } from './adhoc.service';
import { AnyCnameRecord } from 'node:dns';

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

  cycleDefifitionList: Array<any> = [];
  adhocForm : FormGroup;
  cycleNameList: Array<any> = [];  
  @ViewChild( 'adhocForm' ) form: NgForm;
  adhocCycleList: any;
  activeHeadList: Array<any> = [];
  summarydata: Array<any> = [];
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  date: any;
  fromDate: any;
  toDate: any;
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

  

  constructor(public adhocService : AdhocService,public toaster : ToastrService) {
    this.adhocForm = new FormGroup({
     
      businessCycleDefinitionId : new FormControl(''),
      businessCycleId : new FormControl(''),
      periodName : new FormControl(''),
      fromDate : new FormControl(''),
      toDate : new FormControl(''),
      remark : new FormControl(''),
      arrear : new FormControl(''),
      headMasterIds : new FormControl(''),
      cycleName : new FormControl(''),
      headNature : new FormControl(''), 
      startDate : new FormControl(''),
      endDate : new FormControl('')
     // adhocCycleName : new FormControl('')

    })
   }

  ngOnInit(): void {
    this.getAllCycleDefinition();
    this.getAdhocCycle();
    this.getActiveHead();
    this.getSummaryData();
  }

  onSubmit(){
    console.log(this.adhocForm.value);
    this.adhocService.saveAdhocCycle(this.adhocForm.value).subscribe((res)=>{
    this.toaster.success('',"Adhoc cycle saved successfully");
    this.getSummaryData();
    this.cycleNameList = [];
    this.adhocForm.reset();

    this.editFormFlag = false;
    this.viewFormFlag = false;
    })

    
  }

  
  onUpdate(){
      this.adhocService.updateData(this.adhocForm.value).subscribe((res)=>{
      this.toaster.success('',"Updated successfully");
      this.getSummaryData();
      this.cycleNameList = [];
      this.adhocForm.reset();
      this.editFormFlag = false;
      this.viewFormFlag = false;
    })

  }


  getAllCycleDefinition(){
      this.adhocService.getAllCycleDefinition().subscribe((res)=>{
      this.cycleDefifitionList = res.data.results;
      console.log(this.cycleDefifitionList);
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
     console.log(this.cycleNameList);    
     });
    console.log("this.cycleNameList:" + this.cycleNameList);
    //this.getAllCycleDefinition();
   // this.adhocForm.reset();
  }

  getAdhocCycle(){
    this.adhocCycleListNew = [];
      this.adhocService.getAdhocCycle().subscribe((res)=>{
     this.adhocCycleList = res.data.results;
     console.log(this.adhocCycleList)
    // res.data.results[0].forEach(element => {
    //   this.adhocCycleList.push({
    //     label : element.periodId,
    //     value : element.periodName
    //   })
      
    // })
     

      // this.adhocCycleList = res.data.results.businessYeardefinition;
      //  console.log(this.adhocCycleList);
    })
  }

  getActiveHead(){
      this.adhocService.getActiveHead().subscribe((res)=>{
      this.activeHeadList = res.data.results;
      console.log(this.activeHeadList);
    })
  }

  getSummaryData(){
      this.adhocService.getSummaryData().subscribe((res)=>{
        console.log("result check",res);
      this.summarydata = res.data.results;
      console.log(this.summarydata);
    })
  }


  formReset(){
    this.adhocForm.reset();
   
      this.cycleNameList = [];
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.adhocForm.enable();  
  }

  onChangeCycle(periodId : any){
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
      this.cycleNameList.forEach(ele =>{
        //console.log(ele.businessCycleDefinition)
        if(ele.periodId == periodId){
          this.selectedPeriodName = ele.periodName
          this.businessCycleDefinition = ele.businessCycleDefinition.businessYearDefinition
          console.log(this.businessCycleDefinition)
         
        }
      })

      let i = 1
      this.adhocCycleList.forEach(element => {
        if(element.periodId == periodId){
          i = i+1
        }
      });
      this.periodName = this.selectedPeriodName+'-A&W'+i
      console.log(this.periodName)
    // console.log("this.businessCycleDefinition: " + JSON.stringify(this.businessCycleDefinition))
   this.adhocForm.controls['cycleName'].setValue(this.periodName)
   this.adhocForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
   this.adhocForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
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


  editAreaSet(data){
    this.editFormFlag =true;
    this.viewFormFlag = false;
    this.adhocForm.enable();
    this.adhocForm.patchValue(data);
}

viewAreaSet(data){
    this.editFormFlag =false;
    this.viewFormFlag = true;
    this.adhocForm.disable();
    this.adhocForm.patchValue(data);
}  

  setPolicyEndDate(){}
 
}
