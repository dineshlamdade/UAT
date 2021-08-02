import { element } from 'protractor';
import { DatePipe, DOCUMENT } from '@angular/common';

import { Component, OnInit, ResolvedReflectiveFactory, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtCompanyService } from '../bank-master-at-company/bank-master-at-company.service';
import { JobMasterService } from './job-master.service';
@Component( {
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.scss'],
} )
export class JobMasterComponent implements OnInit {
  id: number;
  type: string;
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

  public isSaveAndReset = true;
  public form: any = FormGroup;
  public formAssignment: any = FormGroup;
  public formAssign: any = FormGroup;

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
  public excelEmployeeList: Array<any> = [];
  public getAllMappingDetailListNew: Array<any> = [];

  public tableDataList = [];
  public companyAssignTableList = [];
  // public tableDataList1 = [];
  public selectedCheckBox = [];
  public selectedCompanyListCheckBox = [];
  public hideFormControl = true;
  public groupCompanyDetailsList = [];
  public companyListResponse: any;
  public checkedList: any;
  public masterSelected: boolean;
  public Index: number;
  public jobMasterList = [
    // { value: 'All', postUrl: '', putUrl: '', deleteUrl: '' },
    // { value: 'Business Area', postUrl: 'job-master/', putUrl: 'business-area-master/update', deleteUrl: 'business-area-master/', postMappingToCompany: 'business-area-master-mapping/map-all', deleteMapping: 'business-area-master-mapping/' },
    // { value: 'Sub Area', postUrl: 'job-master/', putUrl: 'subarea-master/update', deleteUrl: 'subarea-master/', postMappingToCompany: 'subarea-master-mapping/map-all', deleteMapping: 'subarea-master-mapping/' },
    // { value: 'Strategic Business Unit', postUrl: 'job-master/', putUrl: 'strategicbusinessunit-master/update', deleteUrl: 'strategicbusinessunit-master/', postMappingToCompany: 'strategic-businessunit-mapping/map-all', deleteMapping: 'strategic-businessunit-mapping/' },
    // { value: 'Division', postUrl: 'job-master/', putUrl: 'division-master/update', deleteUrl: 'division-master/', postMappingToCompany: 'division-master-mapping/map-all', deleteMapping: 'division-master-mapping/' },
    // { value: 'Profit Centre', postUrl: 'job-master/', putUrl: 'profitcentre-master/update', deleteUrl: 'profitcentre-master/', postMappingToCompany: 'profitcentre-mapping/map-all', deleteMapping: 'profitcentre-mapping/' },
    // { value: 'Sub Location', postUrl: 'job-master/', putUrl: 'sublocation-master/update', deleteUrl: 'sublocation-master/', postMappingToCompany: 'sublocation-master-mapping/map-all', deleteMapping: 'sublocation-master-mapping/' },
    // { value: 'Work Location', postUrl: 'job-master/', putUrl: 'worklocation-master/update', deleteUrl: 'worklocation-master/', postMappingToCompany: 'worklocationmaster-mapping/map-all', deleteMapping: 'worklocationmaster-mapping/' },
    // { value: 'Cost Centre', postUrl: 'job-master/', putUrl: 'costcentre-master/update', deleteUrl: 'costcentre-master/', postMappingToCompany: 'costcentre-mapping/map-all', deleteMapping: 'costcentre-mapping/' },
    // { value: 'Sub Cost Centre', postUrl: 'job-master/', putUrl: 'subcostcentre-master/update', deleteUrl: 'subcostcentre-master/', postMappingToCompany: 'subcostcentre-master-mapping/map-all', deleteMapping: 'subcostcentre-master-mapping/' },
    // { value: 'Department', postUrl: 'job-master/', putUrl: 'department-master/update', deleteUrl: 'department-master/', postMappingToCompany: 'department-master-mapping/map-all', deleteMapping: 'department-master-mapping/' },
    // { value: 'Sub Department', postUrl: 'job-master/', putUrl: 'subdepartment-master/update', deleteUrl: 'subdepartment-master/', postMappingToCompany: 'subdepartment-master-mapping/map-all', deleteMapping: 'subdepartment-master-mapping/' },
    // { value: 'Grade', postUrl: 'job-master/', putUrl: 'grade-master/update', deleteUrl: 'grade-master/', postMappingToCompany: 'grade-master-mapping/map-all', deleteMapping: 'grade-master-mapping/' },
    // { value: 'Project', postUrl: 'job-master/', putUrl: 'project-master/update', deleteUrl: 'project-master/', postMappingToCompany: 'projectmaster-mapping/map-all', deleteMapping: 'projectmaster-mapping/' },
    // { value: 'Plant', postUrl: 'job-master/', putUrl: 'plant-master/update', deleteUrl: 'plant-master/', postMappingToCompany: 'plantmaster-mapping/map-all', deleteMapping: 'plantmaster-mapping/' },
    // { value: 'Region', postUrl: 'job-master/', putUrl: 'region-master/update', deleteUrl: 'region-master/', postMappingToCompany: 'regionmaster-mapping/map-all', deleteMapping: 'regionmaster-mapping/' },
    // { value: 'GL Code', postUrl: 'job-master/', putUrl: 'GLcode-master/update', deleteUrl: 'GLcode-master/', postMappingToCompany: 'GLcodemaster-mapping/map-all', deleteMapping: 'GLcodemaster-mapping/' },
  ];

  public viewMode = false;
  constructor( private formBuilder: FormBuilder, private datePipe: DatePipe, private modalService: BsModalService, private jobMasterService: JobMasterService, private alertService: AlertServiceService, private bankMasterAtCompanyService: BankMasterAtCompanyService ) {
    this.form = this.formBuilder.group( {
      jobMasterType: new FormControl( 'All' ),
      masterCode: new FormControl( '', Validators.required ),
      masterDescription: new FormControl( '', Validators.required ),
      jobMasterId: new FormControl( ''),
      isActive: new FormControl( '' ),
      jobMasterValueId: new FormControl( '' ),
      active: new FormControl( '' ),
    } );


    this.formAssignment = this.formBuilder.group( {
      groupCompanyId: new FormControl( 'All' ),
      companyName: new FormControl( 'All', Validators.required ),
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
    this.getJobMasterDropDownList();
    this.getJobMasterDropDownListAssign();
    this.getAllOtheMappingDetails ();
    this.tableDataList = [];
    this.refreshHtmlTable ();
    // this.getAllJobMasters();

    // this.jobMasterService.get( 'business-area-master/details' ).subscribe( ( res ) => {
    //   console.log( 'getBusinessAreaMasterDetails', res );
    // } );
    // this.jobMasterService.get( 'business-area-master-mapping/details' ).subscribe( ( res ) => {
    //   console.log( 'getBusinessAreaMasterMappingDetails', res );
    // } );



    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe( ( res ) => {
      console.log( 'bank company', res );
      this.companyListResponse = res.data.results;
      let i = 0;
      res.data.results.forEach( ( element ) => {
        if ( element.companyActive == true ) {
          const obj = {
            // id: i++,
            // groupCompanyId: element.groupCompanyId,
            // companyName: element.companyName,
            // companyActive: element.groupCompanyId,
            // isSelected: false,

            label: element.companyName,
            value: element.groupCompanyId,
          };
          // this.groupCompanyDetailsList.push( { id: element.groupCompanyId, itemName: element.companyName } );
          this.summaryCompanyHtmlDataList.push( obj );
          this.groupCompanyDetailsList.push( obj );
          this.summaryCompanyHtmlDataList1.push( obj );
        }
      } );
    } );


    //New added 01/07/2021
    // this.jobMasterService.getAllOtheMappingDetails().subscribe( ( res ) => {
    //   console.log( 'getAllOtheMappingDetails bank company', res );
    //   this.companyListResponse = res.data.results;
    //   let i = 0;
    //   res.data.results.forEach( ( element ) => {
    //     if ( element.companyActive == true ) {
    //       const obj = {


    //         SrNo: i++,
    //         masterMappingId: element.jobMasterMappingId,
    //         masterId: element.jobMasterValueId,
    //         groupCompanyId: element.groupCompanyId,
    //         masterMappingType: element.jobMasterType,
    //         masterCode: element.masterCode,
    //         companyName: element.masterDescription,
    //         isSelected: false,
    //         companyActive: element.active,


    //         // id: i++,
    //         // groupCompanyId: element.groupCompanyId,
    //         // companyName: element.masterCode,
    //         // companyActive: element.companyActive,
    //         // isSelected: false,
    //       };
    //       this.groupCompanyDetailsList.push( { id: element.groupCompanyId, itemName: element.companyName } );
    //       this.summaryCompanyHtmlDataList.push( obj );
    //       this.summaryCompanyHtmlDataList1.push( obj );
    //     }
    //   } );
    // } );

    // this.getAllOtheMappingDetails();
  }
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

  //komal // get Job Master Drop down API

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


  refreshHtmlTable() {


    this.jobMasterService.getAllOtherMasterDetails().subscribe( ( res ) => {
      this.masterGridDataList = res.data.results;
      console.log( 'getAllOtherMasterDetails xx', res );
      console.log( 'masterGridDataList xx', this.masterGridDataList );
      let i = 1;
      this.companyAssignTableList = [];
      this.masterGridDataList.forEach( ( element ) => {
        const obj = {
          SrNo: i++,
          masterId: element.jobMasterId,
          jobMasterValueId: element.jobMasterValueId,
          masterCode: element.masterCode,
          masterDescription: element.masterDescription,
          jobMasterType: element.jobMasterType,
          isActive: element.active,
          toDate: null,
          fromDate: null,
          isChecked: false,
        };
        this.summaryHtmlDataList.push( obj );
        this.tableDataList.push( obj );
        this.companyAssignTableList.push(obj);

        // this.tableDataList1.push( obj );

      } );
      console.log("companyAssignTableList", this.companyAssignTableList);
    } );

    this.tableDataList = [];
    // this.tableDataList1 = [];
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
  }
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
      this.onSelectJobMaster( 'All' );
      this.form.get( 'isActive' ).setValue( true );
      this.hideFormControl = false;
      // this.refreshHtmlTable();
      // this.getJobMasterDropDownList();

  }

  // Save Comp Master Assign
  saveJobMasterMapping() {
      if ( this.mappedJobMastersToCompany.length > 0 ) {
        this.jobMasterService.postMapping(this.mappedJobMastersToCompany).subscribe(
          (res: any) => {
          if ( res.data.results.length !== 0 ) {
            this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
            this.getAllOtheMappingDetails();
            this.refreshHtmlTable();
          } else {
            this.alertService.sweetalertWarning( res.status.messsage );
          }
        }, ( error: any ) => {
          this.alertService.sweetalertError( error['error']['status']['messsage'] );
        } );
        this.companyAssignTableList = [];

        this.formAssignment.reset();
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
    this.onSelectJobMaster( 'All' );
    this.form.get( 'isActive' ).setValue( true );
    this.form.enable();
    this.refreshHtmlTable();
    this.masterSelected = false;
    this.hideFormControl = false;
    this.summaryHtmlDataList.forEach( x => x.isChecked = false );
    this.tableDataList.forEach( x => x.isChecked = false );
    this.enableCheckAll = false;
    console.log( 'in reset' );
    this.checks = false;
    this.editedRecordIndex = 0;
    this.isEditMode = false;
    this.isViewMode = false;
    this.isUpdateMode = false;
    //  this.form.reset();
    // this.form.get( 'isActive' ).setValue( true );
    //  this.onSelectJobMaster( 'All' );
    this.form.patchValue( {
      masterCode: '',
      masterDescription: '',
    } )
  }



//Assign  Edit And Update

  viewJobMasterAssign(data) {
    console.log(data)
    window.scrollTo( 0, 0 );
    this.isEditModeComp = true;
    this.isViewModeComp = true;
    this.isUpdateModeComp = false;
    // this.hideFormControl = true;
    this.formAssignment.patchValue(data);
    this.companyAssignTableList
    this.formAssignment.disable();
  }



  editUpdateDataAssign(data){

    this.formAssignment.enable();
    console.log("data", data)
    this.isUpdateModeComp = true;
    this.isViewModeComp = false;
    this.isEditModeComp = true;
    window.scrollTo( 0, 0 );
    this.formAssignment.patchValue(data);
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
      masterCode: '',
      masterDescription: '',
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

            this.onSelectJobMaster( 'All' );
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

  // saveJobMasterMapping(){
  //   // const data = this.form.getRawValue();
  //   this.modalRef.hide();
  //   let businessArea = [];

  //   for ( let i = 0; i < this.selectedCheckBox.length; i++ ) {
  //     for ( let j = 0; j < this.selectedCompanyListCheckBox.length; j++ ) {

  //       const obj = {
  //         jobMasterValueId: this.selectedCheckBox[i].jobMasterValueId,
  //         groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
  //       };
  //       businessArea.push( obj );
  //     }
  //   }

  //   console.log("businessArea",businessArea);


  //   if ( businessArea.length > 0 ) {
  //     // const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Business Area' );
  //     this.jobMasterService.postMapping(businessArea).subscribe(
  //       (res: any) => {
  //       console.log( 'Business Area', res );
  //       if ( res.data.results.length !== 0 ) {
  //         this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //       } else {
  //         this.alertService.sweetalertWarning( res.status.messsage );
  //       }
  //     }, ( error: any ) => {
  //       this.alertService.sweetalertError( error['error']['status']['messsage'] );
  //     } );
  //   }
  //     this.enableCheckAll = false;
  //     this.uncheckSelectAll = false;
  //     this.selectedCheckBox = [];
  //     this.uncheckSelectAll = false;
  //     this.summaryHtmlDataList.forEach( x => x.isChecked = false );
  //     this.tableDataList.forEach( x => x.isChecked = false );
  //     this.enableCheckAll = false;

  // }



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


          //  this.refreshHtmlTable();
          // this.getAllOtheMappingDetails();
          //  this.onSelectJobMaster( 'All' );
          //   this.tableDataList = this.tableDataList.filter( ( o ) => o.jobMasterType === 'All' );
          // this.onSelectJobMaster( 'Plant' );
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

      // this.jobMasterService.post( saveData, this.jobMasterList[selectedIndex].postUrl ).subscribe( ( res ) => {
      //   console.log( res.status.messsage );
      //   console.log( res );
      //   if ( res.data.results.length !== 0 ) {
      //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      //     this.form.patchValue( {
      //       masterCode: '',
      //       masterDescription: '',
      //       isActive: true,
      //     } );


      //     const obj = {
      //       jobMasterType: this.jobMasterList[selectedIndex].value,
      //       masterId: res.data.results[0].masterId,
      //       masterDescription: res.data.results[0].masterDescription,
      //       masterCode: res.data.results[0].masterCode,
      //       isActive: res.data.results[0].isActive,
      //       SrNo: len + 1,
      //     };
      //     //  this.summaryHtmlDataList.push( obj );
      //     this.tableDataList.push( obj );
      //     this.summaryHtmlDataList.push( obj );

      //   } else {
      //     this.alertService.sweetalertWarning( res.status.messsage );
      //   }
      // }, ( error: any ) => {
      //   this.alertService.sweetalertError( error['error']['status']['messsage'] );
      // }, () => {

      // } );
    }
  }

  //komal delete summary table API

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


  // deleteBusinessAreaMaster() {
  //   const id = 0;
  //   this.jobMasterService.delete( id, '/business-area-master' ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error.error.status.messsage );
  //   }, () => { } );
  // }

  // deleteBusinessAreaMasterMapping() {
  //   let id = 0;
  //   this.jobMasterService.delete(id, '/business-area-master-mapping').subscribe((res) => {
  //     console.log(res);
  //     this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
  //   }, (error: any) => {
  //     this.alertService.sweetalertError(error.error['status'].messsage);
  //   }, () => { });
  // }
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
// komal Delete master
  // DeleteMaster( masterId: number, jobMasterType: string ) {
  //   console.log( 'in delete master' );

  //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value == jobMasterType );
  //   this.jobMasterService.delete( masterId, this.jobMasterList[selectedIndex].deleteUrl ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //     this.refreshHtmlTable();
  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error.error.status.messsage );
  //   }, () => { } );
  // }

  // editMaster( masterId: number, jobMasterType: string ) {
  //   this.onSelectJobMaster( jobMasterType );

  //   const findIndex = this.tableDataList.findIndex( ( o ) => o.masterId == masterId && o.jobMasterType == jobMasterType );
  //   this.editedRecordIndex = masterId;
  //   this.isEditMode = true;
  //   this.viewMode = false;
  //   this.form.patchValue( this.tableDataList[findIndex] );
  // }
  onSelectJobMaster( evt: any ) {
    this.selectedMasterTypeDropDownValue = this.form.get( 'jobMasterType' ).value;
    this.enableCheckAll = false;
    // this.selectedCheckBox = [];
    this.tableDataList = this.summaryHtmlDataList;
    console.log( evt );
    if ( evt === 'All' ) {
      this.isEditMode = false;
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
      console.log("jobMasterId", this.form.get('jobMasterId').setValue(toSelect.jobMasterId));
      console.log("jobMasterId", this.form.jobMasterId)
  }

  onCheckboxChangeMasterSummary( evt: any, id: number, jobMasterType?: string, masterCode?: string ) {
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

        // this.tableDataList.forEach( x => x.isChecked = true && x.active == false );


        for ( let i = 0; i < this.tableDataList.length; i++ ) {
          if ( this.tableDataList[i].isActive == 1 ) {
            this.selectedCheckBox.push( this.tableDataList[i] );
            this.tableDataList[i].isChecked = true;

          }
        }
      } else {
        for ( let i = 0; i < this.tableDataList.length; i++ ) {
          if ( this.tableDataList[i].isActive == 1 ) {
            this.tableDataList[i].isChecked = false;
          }
        }
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
      }
    } else {
      let findIndexOfTableDataList = this.tableDataList.findIndex( o => o.jobMasterType == jobMasterType && o.masterCode == masterCode );
      let findIndexOfSummaryHtmlDataListList = this.summaryHtmlDataList.findIndex( o => o.jobMasterType == jobMasterType && o.masterCode == masterCode );
      //console.log( 'indexe find is', findIndex );
      if ( evt.target.checked == true ) {
        console.log( 'xxxxxxxxx' );
        // this.summaryHtmlDataList[findIndex].isChecked = true;
        this.tableDataList[findIndexOfTableDataList].isChecked = true;
        this.summaryHtmlDataList[findIndexOfSummaryHtmlDataListList].isChecked = true;
        this.checks = false;


        console.log( 'chceck this', this.tableDataList );
        this.selectedCheckBox.push( this.tableDataList[findIndexOfTableDataList] );
        console.log( 'this.tableDataList[findIndex]', this.tableDataList[findIndexOfTableDataList] );
      } else if ( evt.target.checked === false ) {
        //   this.summaryHtmlDataList[findIndex].isChecked = false;
        this.tableDataList[findIndexOfTableDataList].isChecked = false;
        this.summaryHtmlDataList[findIndexOfSummaryHtmlDataListList].isChecked = false;
        this.checks = false;
        console.log( 'in removing section' );
        this.selectedCheckBox.splice( this.tableDataList[findIndexOfTableDataList], 1 );
        console.log( 'this.summaryHtmlDataList[findIndex]', this.tableDataList[findIndexOfTableDataList] );
      } else {
        console.log( 'something error' );
      }
    }
    console.log( this.selectedCheckBox );

  }


  deactiveActiveCheckBox() {
    console.log( this.form.get( 'isActive' ).value );
  }
  addItemType() { }

  onCheckCompanyboxChange( evt: any, id: number ) {
    this.enableCompanyCheckAll = false;

    if ( id == -1 ) {
      console.log( 'id == -1::' );
      console.log( 'this.summaryCompanyHtmlDataList::', this.summaryCompanyHtmlDataList );
      if ( evt.target.checked == true ) {
        this.enableCompanyCheckAll = true;
        this.selectedCompanyListCheckBox = this.summaryCompanyHtmlDataList1;
      } else {
        this.enableCompanyCheckAll = false;
        this.selectedCompanyListCheckBox = [];
      }
    } else {

      if ( evt.target.checked == true ) {
        this.selectedCompanyListCheckBox.push( this.summaryCompanyHtmlDataList[id] );
      } else if ( evt.target.checked === false ) {
        console.log( 'in removing section' );
        this.selectedCompanyListCheckBox.splice( this.summaryCompanyHtmlDataList[id], 1 );
      } else {
        console.log( 'something error' );
      }
    }
    console.log( this.selectedCompanyListCheckBox );
  }

  // onCheckCompanyboxChange1(evt: any, id: number) {
  //   this.enableCompanyCheckAll = false;
  //   if (id == -1) {
  //     console.log('id == -1::');
  //     if (evt.target.checked == true) {
  //       this.enableCompanyCheckAll = true;
  //       for(let i =0;i<this.tableDataList1.length;i++){
  //         if(this.tableDataList1[i].isActive == 1){
  //          this.selectedCompanyListCheckBox.push(this.tableDataList1[i]);
  //         }
  //       }
  //     } else {
  //       this.enableCompanyCheckAll = false;
  //       this.selectedCompanyListCheckBox = [];
  //     }
  //   } else {
  //     if (evt.target.checked == true) {
  //       this.selectedCompanyListCheckBox.push(this.summaryCompanyHtmlDataList[id]);
  //     } else if (evt.target.checked === false) {
  //       console.log('in removing section');
  //       this.selectedCompanyListCheckBox.splice(this.summaryCompanyHtmlDataList[id], 1);
  //     }
  //   }
  //   console.log(this.selectedCompanyListCheckBox);
  //    // if (evt.target.checked == true) {
  //   //   this.selectedCompanyListCheckBox.push(row);
  //   // } else if (evt.target.checked === false) {
  //   //   console.log('in removing section');
  //   //   this.selectedCompanyListCheckBox.splice(row, 1);
  //   // } else {
  //   //   console.log('something error');
  //   // }
  // }
  saveMapToCompany() {
    this.modalRef.hide();

    let businessArea = [];
    let Cost_Centre = [];
    const Department = [];
    const Division = [];
    let Sub_Cost_Centre = [];
    let Sub_Department = [];
    let Sub_Location = [];
    let GL_Code = [];
    const Grade = [];
    let Profit_Centre = [];
    const Project = [];
    const Region = [];
    const SubArea = [];
    let Strategic_Business_Unit = [];
    const Plant = [];
    let Work_Location = [];
    for ( let i = 0; i < this.selectedCheckBox.length; i++ ) {
      for ( let j = 0; j < this.selectedCompanyListCheckBox.length; j++ ) {



        if ( this.selectedCheckBox[i].jobMasterType == 'Business Area' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          businessArea.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Cost Centre' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Cost_Centre.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Department' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Department.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Division' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Division.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Sub Cost Centre' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Cost_Centre.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Sub Department' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Department.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'GL Code' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          GL_Code.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Grade' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Grade.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Plant' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Plant.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Sub Location' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Location.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Project' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Project.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Profit Centre' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Profit_Centre.push( obj );
        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Region' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Region.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Sub Area' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          SubArea.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Strategic Business Unit' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Strategic_Business_Unit.push( obj );

        }
        if ( this.selectedCheckBox[i].jobMasterType == 'Work Location' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Work_Location.push( obj );

        }
      }
    }
    // const data = this.form.getRawValue();


    // this.jobMasterService.postJobSelectedJobMaster(data).subscribe(
    //   (res: any) => {
    //     // addAttributeCreation.attributeMasterIdList = [];
    //     // this.targetProducts = [];
    //     // this.getAllAttributeSelection();
    //     this.alertService.sweetalertMasterSuccess(res.status.message, '');
    //     this.form.reset();
    //     // this.resetAttributeSelection();
    //   },
    //   (error: any) => {
    //     this.alertService.sweetalertError(error['error']['status']['message']);
    //   }
    // );

    // if ( businessArea.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Business Area' );
    //   this.jobMasterService.postMapping( businessArea, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Business Area', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }


    /// end of two for loop i & j ...
    // if ( businessArea.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Business Area' );
    //   this.jobMasterService.postMapping( businessArea, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Business Area', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }


    // if ( Cost_Centre.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Cost Centre' );
    //   this.jobMasterService.post( Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Cost Centre', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Department.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Department' );
    //   this.jobMasterService.post( Department, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Department', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Division.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Division' );
    //   this.jobMasterService.post( Division, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Division', res );
    //     if ( res.data.results.length !== 0 ) {

    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Sub_Cost_Centre.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Cost Centre' );
    //   this.jobMasterService.post( Sub_Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Sub Cost Centre', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Sub_Department.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Department' );
    //   this.jobMasterService.post( Sub_Department, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Sub Department', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Sub_Location.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Location' );
    //   this.jobMasterService.post( Sub_Location, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Sub Location', res );
    //     if ( res.data.results.length !== 0 ) {

    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( GL_Code.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'GL Code' );
    //   this.jobMasterService.post( GL_Code, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'GL Code', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Grade.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Grade' );
    //   this.jobMasterService.post( Grade, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Grade', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Plant.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Plant' );
    //   this.jobMasterService.post( Plant, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Plant', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Profit_Centre.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Profit Centre' );
    //   this.jobMasterService.post( Profit_Centre, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Profit Centre', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Project.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Project' );
    //   this.jobMasterService.post( Project, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Project', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Region.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Region' );
    //   this.jobMasterService.post( Region, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Region', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( SubArea.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Area' );
    //   this.jobMasterService.post( SubArea, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'SubArea', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Strategic_Business_Unit.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Strategic Business Unit' );
    //   this.jobMasterService.post( Strategic_Business_Unit, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Strategic Business Unit', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Work_Location.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Work Location' );
    //   this.jobMasterService.post( Work_Location, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Work Location', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );
    // }
    this.enableCheckAll = false;
    this.uncheckSelectAll = false;
    this.selectedCheckBox = [];
    this.uncheckSelectAll = false;


    this.summaryHtmlDataList.forEach( x => x.isChecked = false );
    this.tableDataList.forEach( x => x.isChecked = false );
    this.enableCheckAll = false;

  }

  // isAllSelected( evt: any ) {
  //   if ( evt.target.value == false ) {
  //     this.checkUncheckAll();
  //   } else {
  //     this.enableCompanyCheckAll = true;
  //     this.masterSelected = this.summaryCompanyHtmlDataList.every( function ( item: any ) {
  //       return item.isSelected == true;
  //     } );
  //     // this.getCheckedItemList();
  //   }
  // }

  // getCheckedItemList() {
  //   this.checkedList = [];
  //   for ( let i = 0; i < this.summaryCompanyHtmlDataList.length; i++ ) {
  //     if ( this.summaryCompanyHtmlDataList[i].isSelected ) {
  //       this.checkedList.push( this.summaryCompanyHtmlDataList[i] );
  //     }
  //   }
  //   this.checkedList = JSON.stringify( this.checkedList );
  // }

  // checkUncheckAll() {
  //   for ( let i = 0; i < this.summaryCompanyHtmlDataList.length; i++ ) {
  //     this.summaryCompanyHtmlDataList[i].isSelected = this.masterSelected;
  //   }
  //   this.getCheckedItemList();
  // }

   // -------- Select Employee For Approval in checkbox selection---------------------
   onCheckJobMaster(checkValue, element): void {


    if (checkValue) {
      const data = {
        jobMasterValueId: element.jobMasterValueId,
        groupCompanyId: parseInt(this.formAssignment.controls.companyName.value),
        fromDate: element.fromDate,
        toDate: element.toDate
      };
      this.mappedJobMastersToCompany.push(data);
      // this.employeeList.filter((employee)=>employee.jobMasterValueId==element.jobMasterValueId).forEach((excelEmploee)=>{
      //   this.excelEmployeeList.push(excelEmploee);
      // });
    } else {
      const index = this.mappedJobMastersToCompany.indexOf((p) => (p.jobMasterValueId = element.jobMasterValueId));
      this.mappedJobMastersToCompany.splice(index, 1);
      // this.excelEmployeeList.splice(index, 1);
    }
  }

  updateFromDate(eventDate, jobMasterId) {
    this.companyAssignTableList.forEach(element => {
      if (element.jobMasterValueId == jobMasterId) {
        element.fromDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );

      }
    });
  }

  updateToDate(eventDate, jobMasterId) {
    this.companyAssignTableList.forEach(element => {
      if (element.jobMasterValueId == jobMasterId) {
        element.toDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );
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
            // SrNo: i++,
            // masterMappingId: element.masterMappingId,
            // masterId: element.masterId,
            // groupCompanyId: element.groupCompanyId,
            // masterMappingType: element.masterMappingType,
            // masterCode: element.masterCode,
            // companyName: element.companyName,
            // isActive: element.isActive,

            SrNo: i++,
            jobMasterMappingId: element.jobMasterMappingId,
            jobMasterValueId: element.jobMasterValueId,
            groupCompanyId: element.groupCompanyId,
            jobMasterType: element.jobMasterType,
            masterCode: element.masterCode,
            companyName: element.companyName,
            masterDescription: element.masterDescription,
            isActive: element.active,
            toDate:  new Date(element.toDate),
            fromDate: new Date(element.fromDate),

          };
          // this.summaryAllOtherMappingDetailsList.push( obj );
          this.getAllMappingDetailListNew.push( obj );

          // this.tableDataList.push(obj);
        }
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
    console.log( 'yes' );
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
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
  }

  // UploadModal2( template: TemplateRef<any> ) {
  //   console.log( 'in UploadModal2 headmaster id', this.jobMasterId );
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign( {}, { class: 'gray modal-xl' } ) );
  // }


}
