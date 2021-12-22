import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { element } from 'protractor';
import { DatePipe, DOCUMENT } from '@angular/common';

import { Component, OnInit, ResolvedReflectiveFactory, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtCompanyService } from '../bank-master-at-company/bank-master-at-company.service';
import { JobMasterService } from './job-master.service';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
@Component( {
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.scss'],
} )
export class JobMasterComponent implements OnInit {
  isJobMasterTableVisible: boolean = false;
  selectedCompanyId: number;
  id: number;
  type: string;
  tempFromDate = '';
  tempToDate = '';

  summaryType: string;
  public modalRef: BsModalRef;
  public summaryHtmlDataList = [];
  public summaryCompanyHtmlDataList = [];
  public summaryCompanyHtmlDataList1 = [];
  public getAllJobMastersList = [];
  public allJobsList : Array<any> = [];
  public employeeList : Array<any> = [];

  public allMappingList : Array<any> = [];
  public getAllJobMappingsList : Array<any> = [];
    public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isViewMode = false;
  public isUpdateMode = false;
  public isEditModeComp = false;
  public isViewModeComp = false;
  public isUpdateModeComp = false;
  deletedjobMasterId : number;
  modalRef1: BsModalRef;
  modalRef2: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteRowModal1: BsModalRef;
  public financialYearStart: Date;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public formAssignment: any = FormGroup;
  public formAssign: any = FormGroup;
  public paymentDetailMinDate: Date;
  public masterGridDataList = [];
  public editedRecordIndex = 0;
  public getAllMappingDetailList: any;
  public summaryAllOtherMappingDetailsList = [];

  uncheckSelectAll: boolean = false;
  public selectedMasterTypeDropDownValue: string;

  public checks = false;
  public checksCompany = false;
  public enableCheckAll = false;
  public enableCompanyCheckAll = false;
  public mappedJobMastersToCompany: Array<any> = [];
  public companyCopyDataList: Array<any> = [];
    public mappedJobMastersToCompanyInMaster: Array<any> = [];

  public excelEmployeeList: Array<any> = [];
  public getAllMappingDetailListNew: Array<any> = [];
  public financialYearStartDate: Date;
  public tableDataList = [];
  public companyAssignTableList = [];
  public companyAssignTableListDummy = [];
  // public tableDataList1 = [];
  public selectedCheckBox = [];
  public selectedCompanyListCheckBox = [];
  public hideFormControl = true;
  public groupCompanyDetailsList = [];
  public companyListResponse: any;
  public checkedList: any;
  public masterSelected: boolean;
  public Index: number;
  public selectedJobMaster = null;
  public readOnlyMappedJobMaster = false;
  public UpdateModeMappedJobMaster = true;

  public jobMasterList = [];
  // private excelservice: ExcelService,
  public viewMode = false;
  assignJobMasterId: number;

  excelData: any;
  excelDataCompany: any;

  excelDataMapping: any;
  selectedJobId: number;
  public EditMappedJobMaster = null;
  header: any;
  constructor( private formBuilder: FormBuilder, private excelservice: ExcelserviceService, private datePipe: DatePipe, private modalService: BsModalService, private jobMasterService: JobMasterService, private alertService: AlertServiceService, private bankMasterAtCompanyService: BankMasterAtCompanyService ) {
    this.form = this.formBuilder.group( {
      jobMasterType: new FormControl( '' ),
      masterCode: new FormControl( '', Validators.required ),
      masterDescription: new FormControl( '', Validators.required ),
      jobMasterId: new FormControl(''),
      isActive: new FormControl( true ),
      jobMasterValueId: new FormControl( '' ),
      active: new FormControl( '' ),
    } );


    this.formAssignment = this.formBuilder.group( {
      groupCompanyId: new FormControl( '' ),
      companyName: new FormControl('', Validators.required ),
      company: new FormControl( 'All' )
            // jobMasterType: new FormControl( ''),
      // jobMasterId: new FormControl( ''),
      // isActive: new FormControl( '' ),
      // jobMasterValueId: new FormControl( '' ),
      // active: new FormControl( '' ),
    } );


    this.masterSelected = false;
    this.form.get( 'isActive' ).setValue( true );
    this.hideFormControl = false;
  }

  public ngOnInit(): void {
     this.getAllOtheMappingDetails ();
    this.getJobMasterDropDownList();
    this.getJobMasterDropDownListAssign();
    this.tableDataList = [];
    this.refreshHtmlTable ();
    this.getCompanyName ();
   //copy from functionality code not available
   //this.getCopyCompany();
    this.companyDataInDetails();
   // console.log("getAllMappingDetailListNew", this.getAllMappingDetailListNew[0]);

  }   

  companyDataInDetails(){
    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe( ( res ) => {
      this.companyListResponse = res.data.results;
      console.log( 'companyListResponseList', res );
      let i = 0;
      res.data.results.forEach( ( element ) => {
        if ( element.companyActive == true ) {
          const obj = {
            id: i++,
            groupCompanyId: element.groupCompanyId,
            companyName: element.companyName,
            companyActive: element.groupCompanyId,
            isSelected: false,
            fromDate: null,
            toDate: new Date( '31-Dec-9999' )
            // label: element.companyName,
            // value: element.groupCompanyId,
          };
          // this.groupCompanyDetailsList.push( { id: element.groupCompanyId, itemName: element.companyName } );
          this.summaryCompanyHtmlDataList.push( obj );
          this.summaryCompanyHtmlDataList1.push( obj );
        }
      } );
    } );
  }
  // Company Name  Bind in Assign table

  getCompanyName(){
    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe( ( res ) => {
      this.companyListResponse = res.data.results;
      console.log( 'companyListResponseList', res );
      let i = 0;
      res.data.results.forEach( ( element ) => {
        if ( element.companyActive == true ) {
          const obj = {
            label: element.companyName,
            value: element.groupCompanyId,
          };
          this.groupCompanyDetailsList.push( obj );
        }
      } );
    } );
  }

  // commented for copy from functionality is not working testing 

//   getCopyCompany(){
//     this.jobMasterService.getAllCopyFrom().subscribe((res) => {
//       this.companyCopyDataList = res.data.results;
//       console.log("companyCopyDataList", this.companyCopyDataList);
//   })

//  }
  getJobMasterDropDownListAssign(){
    this.jobMasterService.get('all-othermasters-mapping/details').subscribe((res) => {
      this.getAllJobMappingsList = res.data.results;
      console.log("getAllJobMappingsList", this.getAllJobMappingsList )
        res.data.results.forEach((element) => {
        const obj = {
          label: element.companyName,
          value: element.companyName,
        };
        this.allMappingList.push(obj);
      });
    //  this.refreshHtmlTable();

    });
  }

 // get Job Master Drop down API

  getJobMasterDropDownList(){
    this.jobMasterService.getAllJobMasters().subscribe((res) => {
      this.getAllJobMastersList = res.data.results;
      console.log("getAllJobMastersList", this.getAllJobMastersList )
        res.data.results.forEach((element) => {
        const obj = {
          label: element.jobMasterType,
          value: element.jobMasterType,
        };
        this.allJobsList.push(obj);

      });
    //  this.refreshHtmlTable();

    });
  }


  // Sort and Excel
//Job Master Excel
  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = []
    this.header =["jobMasterType", "masterCode", "masterDescription"];
    this.excelData = [];
    if(this.tableDataList.length>0){
     // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
     //this.employeeList =  this.tableDataList;
     this.tableDataList.forEach((element) => {
      let obj = {
        jobMasterType: element.jobMasterType,
        masterCode: element.masterCode,
        masterDescription: element.masterDescription,
      };
      this.excelData.push(obj);
    });
      console.log('this.employeeList::', this.employeeList);
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'Job-Master-Summary', 'Job-Master-Summary' ,this.header);

  }




  //   this.excelservice.exportAsExcelFile(this.excelData, 'Job-Master-Assignment-Summary', 'Job-Master-Assignment-Summary' ,this.header);
  // }


  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }


  //Job Master Excel
  exportApprovalSummaryAsExcelMapping(): void {
    this.excelDataMapping = [];
    this.header = []
    this.header =["jobMasterType", "masterCode", "masterDescription", "fromDate", "toDate"];
    this.excelDataMapping = [];
    if(this.getAllMappingDetailListNew.length>0){
     this.getAllMappingDetailListNew.forEach((element) => {
      let obj = {
        jobMasterType: element.jobMasterType,
        masterCode: element.masterCode,
        masterDescription: element.masterDescription,
        companyName : element.companyName,
        fromDate: element.fromDate,
        toDate:  element.toDate,
      };
      this.excelDataMapping.push(obj);
    });
      console.log('this.excelDataMapping::', this.excelDataMapping);
    }
    this.excelservice.exportAsExcelFile(this.excelDataMapping, 'Mapping-Job-Master-Summary', 'Mapping-Job-Master-Summary' ,this.header);

  }


   //Job Master Excel
   exportApprovalSummaryAsExcelCompanyTable(): void {
    this.excelDataCompany = [];
    this.header = []
    this.header =["jobMasterType", "masterCode", "masterDescription", "fromDate", "toDate"];
    this.excelDataCompany = [];
    if(this.companyAssignTableListDummy.length>0){
     // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
     //this.employeeList =  this.companyAssignTableListDummy;
     this.companyAssignTableListDummy.forEach((element) => {
      let obj = {
        jobMasterType: element.jobMasterType,
        masterCode: element.masterCode,
        masterDescription: element.masterDescription,
        toDate:  new Date(element.toDate),
        fromDate: new Date(element.fromDate),
      };
      this.excelDataCompany.push(obj);
    });
      console.log('this.excelDataCompany::', this.excelDataCompany);
    }
    this.excelservice.exportAsExcelFile(this.excelDataCompany, 'Not-Assigned-Job-Master', 'Not-Assigned-Job-Master' ,this.header);

  }


  customSort2(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  customSort3(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }


  refreshHtmlTable() {

  // setTimeout(()=>{
    this.jobMasterService.getAllOtherMasterDetails().subscribe( ( res ) => {
      this.masterGridDataList = res.data.results;
      console.log( 'getAllOtherMasterDetails xx', res );
      console.log( 'masterGridDataList xx', this.masterGridDataList );
      let i = 1;
      this.companyAssignTableList = [];
      this.companyAssignTableListDummy = [];

      this.masterGridDataList.forEach( ( element ) => {
        const obj = {
          SrNo: i++,
          masterId: element.jobMasterId,
          jobMasterValueId: element.jobMasterValueId,
          masterCode: element.masterCode,
          masterDescription: element.masterDescription,
          jobMasterType: element.jobMasterType,
          isActive: element.active,
          toDate: new Date( '31-Dec-9999' ),
          // toDate: new Date( element.toDate ),
          fromDate: null,
          isCheckedTruefalse:element.mapped !=null ?true:false,
        };
        this.summaryHtmlDataList.push( obj );
        this.tableDataList.push( obj );
        this.companyAssignTableList.push(obj);
        this.companyAssignTableListDummy.push(obj);
        // console.log("isCheckedTruefalse", this.tableDataList.find(x=>x.element.isCheckedTruefalse));

        // this.tableDataList1.push( obj );

      },
      this.tableDataList.sort((x,y)=>x.jobMasterType > y.jobMasterType ? 1: -1)
    );
    //   console.log("companyAssignTableList", this.companyAssignTableList);
    // var tableDataList: { age: number; }[] = [{ age: 10}, { age: 1 }, {age: 5}];
      // this.tableDataList.sort((x,y)=>x.jobMasterType > y.jobMasterType ? 1: -1);
      console.log("tableDataList", this.tableDataList);
    } );


//     var sortedArray: { age: number; }[] = objectArray.sort((n1,n2) => {
//     if (n1.age > n2.age) {
//         return 1;
//     }

//     if (n1.age < n2.age) {
//         return -1;
//     }

//     return 0;
// });




    this.tableDataList = [];
    // this.tableDataList1 = [];
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.form.get( 'isActive' ).setValue( true );
  }
  // ,15000); }
  // saveBusinessAreaMasterMapping() {
  //   const saveData = ({
  //     masterCode: 'SampleCode',
  //     masterDescription: 'Description',
  //     createdBy: 'AnantT',
  //   });

  //   this.jobMasterService.post(saveData, 'business-area-master-mapping/map-all').subscribe((res) => {
  //     console.log('business-area-master-mapping/map-all', res);
  //     if (res.data.results.length !== 0) {
  //       this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
  //     } else {
  //       this.alertService.sweetalertWarning(res.status.messsage);
  //     }
  //   }, (error: any) => {
  //     this.alertService.sweetalertError(error['error']['status']['messsage']);
  //   });
  // }

  // Save Job Master

  saveJobMaster(){
    // const data = this.form.getRawValue();


    const data = [{
      jobMasterId: this.form.get('jobMasterId').value,
      masterDescription: this.form.get( 'masterDescription' ).value,
      masterCode: this.form.get( 'masterCode' ).value,
    }];


    this.jobMasterService.postJobSelectedJobMaster(data).subscribe(
      (res: any) => {
        console.log(res);
        if(res){
          if(res.data.results.length > 0) {
            // this.tableDataList = res.data.results;
            this.refreshHtmlTable();
            this.alertService.sweetalertMasterSuccess( res.status.message, '' );
            this.alertService.sweetalertMasterSuccess( 'Recored Save Successfully.', '' );

          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        }else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });
      // this.refreshHtmlTable();
      this.form.reset();
      // this.onSelectJobMaster( 'All' );
      this.form.patchValue( {
        jobMasterType: ''
      } );
      this.form.get( 'isActive' ).setValue( true );
      this.hideFormControl = false;
      // this.refreshHtmlTable();
      // this.getJobMasterDropDownList();

  }

  // Save Comp Master Assign
  saveJobMasterMapping() {
    console.log('Dummy data',this.companyAssignTableListDummy);

let fieldName1Data = this.mappedJobMastersToCompany.find(obj => obj.fromDate == null);
if(fieldName1Data!=null){
  this.alertService.sweetalertError( 'Please Select FromDate' );
  return
}
      if ( this.mappedJobMastersToCompany.length > 0 ) {
        this.jobMasterService.postMapping(this.mappedJobMastersToCompany).subscribe(
          (res: any) => {
          if ( res.data.results.length !== 0 ) {
            this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
            this.mappedJobMastersToCompany=[];
            // this.onCompanySelect(data.groupCompanyId);
            this.isJobMasterTableVisible = false;
            this.getAllOtheMappingDetails();
            this.refreshHtmlTable();
          } else {
            this.alertService.sweetalertWarning( res.status.messsage );
          }
        }, ( error: any ) => {
          this.alertService.sweetalertError( error['error']['status']['messsage'] );
        } );
        this.companyAssignTableList = [];
        this.mappedJobMastersToCompany = [];
        this.companyAssignTableListDummy = [];

        this.formAssignment.reset();
        this.formAssignment.patchValue( {
          companyName: ''
        } );
        this.form.get( 'isActive' ).setValue( true );
      }
    }

      // Save Assign Master in Job Master Table
  saveJobMasterMappingInMaster() { 
  
      if ( this.mappedJobMastersToCompanyInMaster.length > 0 ) {
        this.jobMasterService.postMapping(this.mappedJobMastersToCompanyInMaster).subscribe(
          (res: any) => {
          if ( res.data.results.length !== 0 ) {
              //  this.summaryCompanyHtmlDataList = [];
            this.modalRef.hide();
            this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
            this.mappedJobMastersToCompanyInMaster = [];
            this.getAllOtheMappingDetails();
            this.refreshHtmlTable();
            this.formAssignment.reset();
          } else {
            this.alertService.sweetalertWarning( res.status.messsage );
          }
        }, ( error: any ) => {
          this.alertService.sweetalertError( error['error']['status']['messsage'] );
        } );

        this.closeModule();
        // this.formAssignment.reset();
      }
    }


  viewJobMaster(data) {
    console.log(data)
    window.scrollTo( 0, 0 );
    this.isEditMode = true;
    this.isViewMode = true;
    this.isUpdateMode = false;
    this.hideFormControl = true;
    this.form.patchValue(data);
    this.form.disable();
  }

  editUpdateDataJobMaster(data){
    this.form.enable();
    // this.form.get('code').disable();
    // this.form.get('jobMasterType').disable();
    this.form.get( 'masterCode' ).disable();
    this.form.get( 'jobMasterType' ).disable();
    console.log('in Update');
console.log('latest',this.form.get('masterCode').status=='Disabled'?false:true);
    console.log("data", data)
    // this.onSelectJobMaster( i );

    this.hideFormControl = true;
    this.isUpdateMode = true;
    this.isViewMode = false;

    this.isEditMode = true;
    window.scrollTo( 0, 0 );
    this.form.patchValue(data);
    // this.form.patchValue(this.tableDataList[data]);
  }

  cancelView() {

  //  this.form.enable();
   //this.refreshHtmlTable();
  //  this.masterSelected = false;

    //this.enableCheckAll = false;
    // console.log( 'in reset' );
  //  this.checks = false;
   // this.editedRecordIndex = 0;
   // this.isEditMode = false;
   // this.isViewMode = false;
   // this.isUpdateMode = false;
   // this.hideFormControl = false;
   // this.form.reset();
    this.form.get( 'isActive' ).setValue( true );
    this.form.get('masterCode').setValue('');
    this.form.get('masterDescription').setValue('');
    this.form.get('jobMasterType').setValue('')
    // this.form.patchValue( {
    //   jobMasterType: ''
    // } );

  }



  editUpdateDataAssign(data){
    this.formAssignment.enable();
    console.log("data", data)
    this.isUpdateModeComp = true;
    this.isViewModeComp = false;
    this.isEditModeComp = true;
    window.scrollTo( 0, 0 );
    this.formAssignment.patchValue({companyName: data.groupCompanyId});
    this.onCompanySelect(data.groupCompanyId);
    this.companyAssignTableListDummy = [];
    this.companyAssignTableListDummy.push(data);
  }

  


  resetAssignment() {

  }

  cancelViewAssign() {
    this.refreshHtmlTable();
    this.masterSelected = false;
    this.formAssignment.get( 'isActive' ).setValue( true );
    this.hideFormControl = false;
    this.summaryHtmlDataList.forEach( x => x.isChecked = false );
    this.tableDataList.forEach( x => x.isChecked = false );
    this.formAssignment.enable();
    this.enableCheckAll = false;
    console.log( 'in reset' );
    this.checks = false;
    this.editedRecordIndex = 0;
    this.isEditModeComp = false;
    this.isViewModeComp = false;
    this.isUpdateModeComp = false;
    //  this.formAssignment.reset();
    // this.formAssignment.get( 'isActive' ).setValue( true );

    this.formAssignment.patchValue( {
      companyName: '',
      company: '',
    } )
  }

//Update Job Master
  updateSave(){

    this.isUpdateMode = false;
    // this.isViewMode = false;
    this.isEditMode = true;
    console.log("jobMasterType", this.form.get('jobMasterType').value)

    const toSelect = this.masterGridDataList.find(
      (c) => c.jobMasterType == this.form.get('jobMasterType').value);

       this.form.get('jobMasterId').setValue(toSelect.jobMasterId);
      /// this.form.get('jobMasterValueId').setValue(toSelect.jobMasterValueId);

     //  this.form.get('isActive').setValue(toSelect.active);

    //  console.log("jobMasterValueId", this.form.get('jobMasterValueId').setValue(toSelect.jobMasterValueId));
    //  console.log("active",  this.form.get('isActive').setValue(toSelect.active));

    const data = {
      jobMasterId: parseInt(this.form.get('jobMasterId').value),
      masterDescription: this.form.get( 'masterDescription' ).value,
      masterCode: this.form.get( 'masterCode' ).value,
      jobMasterValueId: parseInt(this.form.get( 'jobMasterValueId' ).value),
      active: this.form.get( 'isActive' ).value,
    };


    this.jobMasterService.putJobMasterDetails(data).subscribe(
      (res: any) => {
        // addAttributeCreation.attributeMasterIdList = [];
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          // this.isEditMode = false;
          this.form.enable();
          this.alertService.sweetalertMasterSuccess( 'Recored Updated Successfully.', '' );
          this.refreshHtmlTable();
          // this.isSaveAndReset = true;
          // this.showButtonSaveAndReset = true;
          this.form.reset();
          this.hideFormControl = false;
          this.form.get( 'isActive' ).setValue( true );
          this.form.patchValue( {
            jobMasterType: ''
          } );

          this.isEditMode = false;

        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }
    );
  }

  //Update Company Assign
  updateSaveCompanyAssign(){
    this.isUpdateMode = false;
    // this.isViewMode = false;
    this.isEditMode = true;
    console.log("jobMasterType", this.form.get('jobMasterType').value)

    const toSelect = this.masterGridDataList.find(
      (c) => c.jobMasterType == this.form.get('jobMasterType').value);

       this.form.get('jobMasterId').setValue(toSelect.jobMasterId);
       this.form.get('jobMasterValueId').setValue(toSelect.jobMasterValueId);

       this.form.get('isActive').setValue(toSelect.active);

      console.log("jobMasterValueId", this.form.get('jobMasterValueId').setValue(toSelect.jobMasterValueId));
      console.log("active",  this.form.get('isActive').setValue(toSelect.active));

    const data = {
      jobMasterId: parseInt(this.form.get('jobMasterId').value),
      masterDescription: this.form.get( 'masterDescription' ).value,
      masterCode: this.form.get( 'masterCode' ).value,
      jobMasterValueId: parseInt(this.form.get( 'jobMasterValueId' ).value),
      active: this.form.get( 'isActive' ).value,
    };


    this.jobMasterService.putJobMasterDetails(data).subscribe(
      (res: any) => {
        // addAttributeCreation.attributeMasterIdList = [];
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          // this.isEditMode = false;
          this.alertService.sweetalertMasterSuccess( 'Recored Updated Successfully.', '' );
          this.refreshHtmlTable();
          // this.isSaveAndReset = true;
          // this.showButtonSaveAndReset = true;
          this.form.reset();

          this.isEditMode = false;

        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
        this.form.patchValue( {
          jobMasterType: ''
        } );

            // this.onSelectJobMaster( 'All' );
    this.form.get( 'isActive' ).setValue( true );
    this.form.enable();
    this.form.get( 'masterCode' ).enable();
    this.form.get( 'jobMasterType' ).enable();
      }
    );
  }


  public findByPolicyNo(masterId, tableDataList) {
    return tableDataList.find((x) => x.jobMasterId === masterId);
  }

  



  saveMaster() {
    //  let lastIndex = this.tableDataList.findIndex(o=>o.jobMasterType =='Business Area')
    let a = this.form.get( 'jobMasterType' ).value;
    console.log( 'a value ', a );

    let len = this.tableDataList.filter( function ( item ) {
      return item.jobMasterType == a;
    } ).length;
    this.checks = false;
    this.enableCheckAll = false;
    this.selectedCheckBox = [];
    let isActive = 0;
    console.log( 'isActive value is', this.form.get( 'isActive' ).value );
    if ( this.form.get( 'isActive' ).value == true ) {
      isActive = 1;
    } else {
      isActive = 0;

    }
    const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === this.form.get( 'jobMasterType' ).value );
    console.log( 'selected index' + selectedIndex );
    console.log( 'in update fucntion::', this.editedRecordIndex );
    if ( this.editedRecordIndex > 0 ) {
      console.log( 'in update fucntion::', this.editedRecordIndex );
      const saveData = {
        masterId: this.editedRecordIndex,
        masterDescription: this.form.get( 'masterDescription' ).value,
        masterCode: this.form.get( 'masterCode' ).value,
        createdBy: 'AnantT',
        isActive: isActive,
      };

      // this.jobMasterService.put( saveData, this.jobMasterList[selectedIndex].putUrl ).subscribe( ( res ) => {
        this.jobMasterService.put( saveData).subscribe( ( res ) => {
        // this.jobMasterService.put( saveData, ).subscribe( ( res ) => {
        console.log( res.status.messsage );
        console.log( res );
        if ( res.data.results.length !== 0 ) {
          this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
          //this.form.reset();
          // this.form.get('masterCode').setValue = '';
          // this.form.get('masterDescription').setValue = '';
          this.form.get( 'masterCode' ).setValue( null );
          this.form.get( 'masterDescription' ).setValue( null );
          this.form.get( 'isActive' ).setValue( true );
          this.isUpdateMode = false;
          this.isEditMode = false;
          this.editedRecordIndex = 0;

          let findIndex = this.tableDataList.findIndex( o => o.masterId == res.data.results[0].masterId );
          const obj = {
            jobMasterType: this.jobMasterList[selectedIndex].value,
            masterId: res.data.results[0].masterId,
            masterDescription: res.data.results[0].masterDescription,
            masterCode: res.data.results[0].masterCode,
            isActive: res.data.results[0].isActive,
            SrNo: this.tableDataList[findIndex].SrNo,
          };
          this.tableDataList[findIndex] = obj;


         
          this.form.patchValue( {
            masterCode: '',
            masterDescription: '',
            isActive: true,
          } );
          //  this.tableDataList = this.tableDataList.filter( ( o ) => o.jobMasterType === 'Plant' );


        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error['error']['status']['messsage'] );
      }, () => {

      } );
    } else {

      const saveData = {
        masterDescription: this.form.get( 'masterDescription' ).value,
        masterCode: this.form.get( 'masterCode' ).value,
        createdBy: 'AnantT',
      };
    }
  }

  // delete summary table API

  deleteBusinessAreaMaster( id ): void {
    console.log( 'delete', id );
    // this.updateFlag = false;
    this.jobMasterService.delete( id )
      .subscribe( response => { //: saveBusinessYear[]
        this.alertService.sweetalertMasterSuccess( response.status.message, '' );
        // this.getAllBusinessyear();
        // this.BusinessYearform.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
  }


  // DeleteMaster( jobMasterValueId: number, jobMasterType: string )
  DeleteMaster( jobMasterValueId: number, jobMasterType: string ) {

    console.log( 'delete', jobMasterValueId );
    const selectedIndex = this.masterGridDataList.findIndex( ( o ) => o.value == jobMasterType );
    console.log("selectedIndex",selectedIndex);
    this.jobMasterService.delete( jobMasterValueId).subscribe( ( res ) => {
      console.log( res );
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.refreshHtmlTable();
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    }, () => { } );
  }

  onSelectJobMaster( evt: any ) {
    this.selectedMasterTypeDropDownValue = this.form.get( 'jobMasterType' ).value;
    this.enableCheckAll = false;
    // this.selectedCheckBox = [];
    this.isEditMode = false;
    this.tableDataList = this.summaryHtmlDataList;
    console.log( evt );
    if ( evt === 'All' ) {
    
      this.hideFormControl = false;
      this.tableDataList = this.summaryHtmlDataList;
      //  this.tableDataList1 = this.tableDataList;
    } else {
      
      this.hideFormControl = true;
      this.tableDataList = this.tableDataList.filter( ( o ) => o.jobMasterType === evt );
    }
    // this.tableDataList1 = this.tableDataList;
    this.checks = false;
    console.log( evt );
    const toSelect = this.getAllJobMastersList.find(
      (c) => c.jobMasterType === this.form.get('jobMasterType').value
    );
    this.form.get('jobMasterId').setValue(toSelect.jobMasterId);
    //  console.log("jobMasterId", this.form.get('jobMasterId').setValue(toSelect.jobMasterId));
     // console.log("jobMasterId", this.form.jobMasterId)
  }



  deactiveActiveCheckBox() {
    console.log( this.form.get( 'isActive' ).value );
    if(this.form.get( 'jobMasterValueId' ).value==""){
      this.form.get( 'isActive' ).setValue(true);
    }
  }
  addItemType() { }


  // saveMapToCompany() {
  //   this.modalRef.hide();

  //   let businessArea = [];
  //   let Cost_Centre = [];
  //   const Department = [];
  //   const Division = [];
  //   let Sub_Cost_Centre = [];
  //   let Sub_Department = [];
  //   let Sub_Location = [];
  //   let GL_Code = [];
  //   const Grade = [];
  //   let Profit_Centre = [];
  //   const Project = [];
  //   const Region = [];
  //   const SubArea = [];
  //   let Strategic_Business_Unit = [];
  //   const Plant = [];
  //   let Work_Location = [];
  //   for ( let i = 0; i < this.selectedCheckBox.length; i++ ) {
  //     for ( let j = 0; j < this.selectedCompanyListCheckBox.length; j++ ) {



  //       if ( this.selectedCheckBox[i].jobMasterType == 'Business Area' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         businessArea.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Cost Centre' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Cost_Centre.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Department' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Department.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Division' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Division.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Sub Cost Centre' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Sub_Cost_Centre.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Sub Department' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Sub_Department.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'GL Code' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         GL_Code.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Grade' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Grade.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Plant' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Plant.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Sub Location' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Sub_Location.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Project' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Project.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Profit Centre' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Profit_Centre.push( obj );
  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Region' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Region.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Sub Area' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         SubArea.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Strategic Business Unit' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Strategic_Business_Unit.push( obj );

  //       }
  //       if ( this.selectedCheckBox[i].jobMasterType == 'Work Location' ) {
  //         const obj = {
  //           masterId: this.selectedCheckBox[i].masterId,
  //           groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //           createdBy: 'AnantT',
  //         };
  //         Work_Location.push( obj );

  //       }
  //     }
  //   }
  
  //   this.enableCheckAll = false;
  //   this.uncheckSelectAll = false;
  //   this.selectedCheckBox = [];
  //   this.uncheckSelectAll = false;


  //   this.summaryHtmlDataList.forEach( x => x.isChecked = false );
  //   this.tableDataList.forEach( x => x.isChecked = false );
  //   this.enableCheckAll = false;

  // }

 

  onCheckJobMasterTable(checkValue, element): void {
    if (checkValue) {
      const data = {
        jobMasterValueId: this.selectedJobMaster.jobMasterValueId,
        groupCompanyId: element.groupCompanyId,
        fromDate: this.datePipe.transform(element.fromDate, "dd-MMM-yyyy"),
        toDate: this.datePipe.transform(element.toDate, "dd-MMM-yyyy")
      };
      this.mappedJobMastersToCompanyInMaster.push(data);
     
    } else {
      const index = this.mappedJobMastersToCompanyInMaster.indexOf((p) => (p.jobMasterValueId = element.jobMasterValueId));
      this.mappedJobMastersToCompanyInMaster.splice(index, 1);
      // this.excelEmployeeList.splice(index, 1);
    }
  }


  updateFromDateMaster(index, eventDate) {
    if(eventDate != null) {
      this.getAllMappingDetailListNew[index].fromDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
    }
  }

  updateToDateMaster(index, eventDate) {
    if(eventDate != null){
      this.getAllMappingDetailListNew[index].toDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
    }
  }

   // --------CheckBox Select Employee For Approval in checkbox selection---------------------

   onCheckJobMaster(checkValue, element,e): void {
    if (checkValue) {
      this.companyAssignTableListDummy.find(x=>x.SrNo==element.SrNo).isCheckedTruefalse=true;
      const data = {
        jobMasterValueId: element.jobMasterValueId,
        groupCompanyId: parseInt(this.formAssignment.controls.companyName.value),
        fromDate: this.datePipe.transform(element.fromDate, "dd-MMM-yyyy"),
        toDate: this.datePipe.transform(element.toDate, "dd-MMM-yyyy"),
      //  isCheckedTruefalse:true
      };
      this.mappedJobMastersToCompany.push(data);
     
    } else {
      const index = this.mappedJobMastersToCompany.indexOf((p) => (p.jobMasterValueId = element.jobMasterValueId));
      this.mappedJobMastersToCompany.splice(index, 1);
      // this.excelEmployeeList.splice(index, 1);
    }
console.log('table',e);
  }

  updateFromDate(eventDate, jobMasterId) {
    this.companyAssignTableListDummy.forEach(element => {
      if (element.jobMasterValueId == jobMasterId) {
        element.fromDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
        this.mappedJobMastersToCompany.find(a=>a.jobMasterValueId==jobMasterId).fromDate=element.fromDate;
      }
    });
  }

  updateToDate(eventDate, jobMasterValueId) {
    this.companyAssignTableListDummy.forEach(element => {
      if (element.jobMasterValueId == jobMasterValueId) {
        element.toDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
        /// after discussion below functionality will be removed
        this.mappedJobMastersToCompany.find(a=>a.jobMasterValueId==jobMasterValueId).toDate=element.toDate;
      }
    });
  }


  UploadModal( template: TemplateRef<any> ) {
    this.checksCompany = false;
    this.enableCompanyCheckAll = false;
    this.selectedCompanyListCheckBox = [];
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } ),
    );
    this.getAllOtheMappingDetails();
  }

  getAllOtheMappingDetails() {
    this.summaryAllOtherMappingDetailsList = [];
    this.getAllMappingDetailList = [];
    this.getAllMappingDetailListNew = [];


    this.jobMasterService.getAllOtheMappingDetails().subscribe( ( res ) => {
       console.log("getAllMappingDetailList",res)
      this.getAllMappingDetailList = res.data.results;
      console.log("getAllMappingDetailList",this.getAllMappingDetailList);
      let i = 1;
      res.data.results.forEach( ( element ) => {
        if ( element.active == 1 ) {
          const obj = {

            SrNo: i++,
            jobMasterMappingId: element.jobMasterMappingId,
            jobMasterValueId: element.jobMasterValueId,
            groupCompanyId: element.groupCompanyId,
            jobMasterType: element.jobMasterType,
            masterCode: element.masterCode,
            companyName: element.companyName,
            masterDescription: element.masterDescription,
            isActive: element.active,
            toDate:  element.toDate,
            fromDate: element.fromDate,

          };
          this.summaryAllOtherMappingDetailsList.push( obj );
          this.getAllMappingDetailListNew.push( obj );

          // this.tableDataList.push(obj);
        }
       //console.log('this.getAllMappingDetailListNew',this.getAllMappingDetailListNew)
      } );
    } );

  }



//Komal comment
  // DeleteMasterMapping( masterId: number, jobMasterType: string ) {
  //   console.log( 'in delete master mapping  id', masterId + 'Master type', jobMasterType );
  //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === jobMasterType );

  //   this.jobMasterService.delete( masterId, this.jobMasterList[selectedIndex].deleteMapping ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //     this.getAllOtheMappingDetails();
  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error.error.status.messsage );
  //   }, () => { } );
  // }

  DeleteMasterMapping( jobMasterValueId: number, jobMasterType: string ) {

    console.log( 'delete', jobMasterValueId );
    const selectedIndex = this.getAllMappingDetailList.findIndex( ( o ) => o.value == jobMasterType );
    console.log("selectedIndex",selectedIndex);
    this.jobMasterService.deleteMapping( jobMasterValueId).subscribe( ( res ) => {
      console.log( res );
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.refreshHtmlTable();
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    }, () => { } );
  }

  ConfirmationDialog( confirmdialog: TemplateRef<any>, jobMasterValueId: number, type: string, summaryType: string ) {
    this.id = jobMasterValueId;
    this.type = type;
    this.summaryType = summaryType;
    this.modalRef = this.modalService.show(
      confirmdialog,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  clickedOnYes() {
    //console.log( 'yes' );
    if ( this.summaryType == 'master-summary' ) {
      this.DeleteMaster( this.id, this.type );
    }
    if ( this.summaryType == 'assignment-summary' ) {
      // this.DeleteMasterMapping( this.id, this.type );
    }
  }


  UploadModal1( template: TemplateRef<any>, jobMasterValueId: number ) {
    this.deletedjobMasterId = jobMasterValueId;
    this.deleteModalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }


  DeletePayrollHeadGroup(): void {
      this.jobMasterService.delete( this.deletedjobMasterId).subscribe( ( res ) => {
        console.log( res );
        this.alertService.sweetalertMasterSuccess('Job Master Mapping deleted successully', '' )
        this.refreshHtmlTable();
        this.form.reset();
         this.form.patchValue( {jobMasterType: ''} );
       
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
  }

 

  UploadModal4( template: TemplateRef<any>, element  ) {
    this.selectedJobMaster = element;
    console.log("selectedJobMaster", this.selectedJobMaster)
    const newArray = this.getAllMappingDetailListNew.filter( e => e.jobMasterValueId == this.selectedJobMaster.jobMasterValueId );
    // console.log("assignJobMasterId",this.assignJobMasterId);
    this.checksCompany = false;
    this.enableCompanyCheckAll = false;
    this.selectedCompanyListCheckBox = [];
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-lg' } ),
    );
    this.getAllOtheMappingDetails();
  }


  mappedMatchingJobMasters(element) {
      return (element.groupCompanyId == this.selectedCompanyId);
  }

  onCompanySelect(companyId) {
    this.isJobMasterTableVisible = false;
    this.selectedCompanyId = parseInt(companyId);
    this.companyAssignTableListDummy = [];
    this.companyAssignTableListDummy = [...this.companyAssignTableList];
    if (companyId != '') {
      this.isJobMasterTableVisible = true;
      // this.companyAssignTableListDummy = this.companyAssignTableList;
      const newArray = this.getAllMappingDetailListNew.filter( e => e.groupCompanyId == this.selectedCompanyId );
      if (newArray.length > 0) {
        newArray.forEach(element => {
          this.companyAssignTableList.forEach((arrayElement, index) => {
            if (element.jobMasterValueId == arrayElement.jobMasterValueId) {
              if (index > -1) {
                this.companyAssignTableListDummy.splice(index, 1);
              }
            }
          });
        });
      }
    }
  }

  onCheckboxChangeMasterSummary( evt: any, id: number, masterType?: string, masterCode?: string ) {
    // this.enableCheckAll = false;
    // console.log(evt);
    // console.log(evt.target.checked);
    console.log( 'check Box', this.checks );
    // console.log(id);
    if ( id == -1 ) {
      console.log( 'id == -1::' );
      if ( evt.target.checked == true ) {
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
        this.enableCheckAll = true;

       
      } else {
        // for ( let i = 0; i < this.tableDataList.length; i++ ) {
        //   if ( this.tableDataList[i].isActive == 1 ) {
        //     this.tableDataList[i].isChecked = false;
        //   }
        // }
        // this.checks = false;
        // this.enableCheckAll = false;
        // this.selectedCheckBox = [];
      }
    } else {
      // let findIndexOfTableDataList = this.tableDataList.findIndex( o => o.masterType == masterType && o.masterCode == masterCode );
      // let findIndexOfSummaryHtmlDataListList = this.summaryHtmlDataList.findIndex( o => o.masterType == masterType && o.masterCode == masterCode );
      // //console.log( 'indexe find is', findIndex );
      // if ( evt.target.checked == true ) {
      //   console.log( 'xxxxxxxxx' );
      //   // this.summaryHtmlDataList[findIndex].isChecked = true;
      //   this.tableDataList[findIndexOfTableDataList].isChecked = true;
      //   this.summaryHtmlDataList[findIndexOfSummaryHtmlDataListList].isChecked = true;
      //   this.checks = false;


      //   console.log( 'chceck this', this.tableDataList );
      //   this.selectedCheckBox.push( this.tableDataList[findIndexOfTableDataList] );
      //   console.log( 'this.tableDataList[findIndex]', this.tableDataList[findIndexOfTableDataList] );
      // } else if ( evt.target.checked === false ) {
      //   //   this.summaryHtmlDataList[findIndex].isChecked = false;
      //   this.tableDataList[findIndexOfTableDataList].isChecked = false;
      //   this.summaryHtmlDataList[findIndexOfSummaryHtmlDataListList].isChecked = false;
      //   this.checks = false;
      //   console.log( 'in removing section' );
      //   this.selectedCheckBox.splice( this.tableDataList[findIndexOfTableDataList], 1 );
      //   console.log( 'this.summaryHtmlDataList[findIndex]', this.tableDataList[findIndexOfTableDataList] );
      // } else {
      //   console.log( 'something error' );
      // }
    }
    console.log( this.selectedCheckBox );

  }

  //Template Code and Date format
  UploadModalEditMode( template: TemplateRef<any>, element  ) {

    this.UpdateModeMappedJobMaster = true;
    this.readOnlyMappedJobMaster = false;
    this.EditMappedJobMaster=[];
    let obj = this.getAllMappingDetailListNew.find(x=>x.jobMasterMappingId==element);
     this.EditMappedJobMaster.push(obj);
    // const newArray = this.getAllMappingDetailListNew.filter( e => e.jobMasterValueId == this.selectedJobMaster.jobMasterValueId );
   // console.log("EditMappedJobMaster",this.EditMappedJobMaster);
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class:'gray modal-xl'} ),
    );
    // this.getAllOtheMappingDetails();
  }

    //Template View
    viewJobMasterAssign( template: TemplateRef<any>, element  ) {
      this.EditMappedJobMaster=[];
      this.EditMappedJobMaster.push(element);
      this.readOnlyMappedJobMaster = true;
      this.UpdateModeMappedJobMaster = false;

      // const newArray = this.getAllMappingDetailListNew.filter( e => e.jobMasterValueId == this.selectedJobMaster.jobMasterValueId );
      console.log("EditMappedJobMaster",this.EditMappedJobMaster);
      this.modalRef = this.modalService.show(
        template,
        Object.assign( {}, { class:'gray modal-xl'} ),
      );
    }



  // updateFromDateInEdit(eventDate) {
  //   this.EditMappedJobMaster.fromDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
  // }

  // updateToDateInEdit(eventDate) {
  //   this.EditMappedJobMaster.toDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
  // }


  //Updated Job Master Save
  updateAssignSave(EditMapping){

    const data =   {
      jobMasterMappingId : EditMapping.jobMasterMappingId,
      jobMasterValueId : EditMapping.jobMasterValueId,
      groupCompanyId  : EditMapping.groupCompanyId,
      fromDate  :  this.datePipe.transform(EditMapping.fromDate, "dd-MMM-yyyy"),
      toDate  :  this.datePipe.transform(EditMapping.toDate, "dd-MMM-yyyy"),
      active  : this.EditMappedJobMaster.isActive,
  }


    this.jobMasterService.putAssignTable(data).subscribe(
      (res: any) => {
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          // this.isEditMode = false;
          this.alertService.sweetalertMasterSuccess( 'Record Updated Successfully.', '' );
          this.modalRef.hide();
          this.getAllOtheMappingDetails();
          this.refreshHtmlTable();
          this.form.reset();
          this.isEditMode = false;
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }
    );
  }

  //Copy date
  copyDateFromTableRow(i : number){
    console.log("i", i);
    if(this.summaryCompanyHtmlDataList[i-1].fromDate == null){
      this.alertService.sweetalertWarning( "Please select date" );
    }else{
      this.summaryCompanyHtmlDataList[i].fromDate = this.summaryCompanyHtmlDataList[i-1].fromDate;
      this.summaryCompanyHtmlDataList[i].toDate = this.summaryCompanyHtmlDataList[i-1].toDate;
    }

  }

  

  closeModule(){
    this.modalRef.hide()
    this.summaryCompanyHtmlDataList = [];
   this.mappedJobMastersToCompanyInMaster = [];
   this.summaryCompanyHtmlDataList.forEach( ( element ) => {
    if ( element.length > 1 ) {
      const obj = {
      
         fromDate: null,
        toDate: null

      };
      this.summaryCompanyHtmlDataList.push( obj );
      // this.getAllMappingDetailListNew.push( obj );

      // this.tableDataList.push(obj);
    }
  } );
  this.companyDataInDetails();

  }

    //------------------- Payment Detail To Date Validations with Payment Detail From Date ----------------
    setPaymentDetailToDate() {
      this.paymentDetailMinDate = this.form.value.fromDate;
      const from = this.datePipe.transform(
        this.form.get('fromDate').value,
        'yyyy-MM-dd'
      );
      const to = this.datePipe.transform(
        this.form.get('toDate').value,
        'yyyy-MM-dd'
      );
      if (from > to) {
        this.form.controls.toDate.reset();
      }
    }

    //-------------- Payment Detail To Date Validations with Current Finanacial Year ----------------
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    const to = this.datePipe.transform(
      this.form.get('toDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    if (to < financialYearStartDate) {
      //this.alertService.sweetalertWarning("To Date can't be earlier that start of the Current Financial Year");
      this.alertService.sweetalertWarning(
        "Policy End Date can't be earlier that start of the Current Financial Year"
      );
      this.form.controls.toDate.reset();
    }
  }

  checkMappingHasFromDate(){
    console.log('disable and enable check boxes',this.mappedJobMastersToCompanyInMaster)
  }


}
